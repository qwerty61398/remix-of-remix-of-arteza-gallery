import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .map((part) => {
      if (part.length <= 2) return part[0] + "*";
      return part.slice(0, 2) + "*".repeat(part.length - 2);
    })
    .join(" ");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { order_id } = await req.json();

    if (!order_id || typeof order_id !== "string" || order_id.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const trimmedId = order_id.trim();
    let orderQuery;

    // Check if it looks like a full UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(trimmedId)) {
      orderQuery = supabaseAdmin
        .from("orders")
        .select("id, customer_name, customer_email, status, payment_status, total_amount, created_at, updated_at")
        .eq("id", trimmedId)
        .single();
    } else {
      // Enforce minimum 8-character prefix for partial searches
      if (trimmedId.length < 8) {
        return new Response(
          JSON.stringify({ error: "Please enter at least 8 characters of your Order ID, or the full Order ID." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      orderQuery = supabaseAdmin
        .from("orders")
        .select("id, customer_name, customer_email, status, payment_status, total_amount, created_at, updated_at")
        .ilike("id", `${trimmedId.toLowerCase()}%`)
        .limit(1)
        .single();
    }

    const { data: order, error: orderError } = await orderQuery;

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found. Please check your Order ID." }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: items } = await supabaseAdmin
      .from("order_items")
      .select("painting_title, quantity, price")
      .eq("order_id", order.id);

    // Mask email for privacy
    const email = order.customer_email;
    const [localPart, domain] = email.split("@");
    const maskedEmail = localPart.slice(0, 2) + "***@" + domain;

    // Mask customer name for privacy
    const maskedName = maskName(order.customer_name);

    return new Response(
      JSON.stringify({
        order: {
          id: order.id,
          customer_name: maskedName,
          customer_email: maskedEmail,
          status: order.status,
          payment_status: order.payment_status,
          total_amount: order.total_amount,
          created_at: order.created_at,
          updated_at: order.updated_at,
        },
        items: items || [],
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
