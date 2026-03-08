import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    // Try matching by full UUID or by prefix (first 8 chars)
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
      // Search by prefix (case-insensitive)
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

    // Mask email for privacy: show first 2 chars + ***@domain
    const email = order.customer_email;
    const [localPart, domain] = email.split("@");
    const maskedEmail = localPart.slice(0, 2) + "***@" + domain;

    return new Response(
      JSON.stringify({
        order: {
          id: order.id,
          customer_name: order.customer_name,
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
