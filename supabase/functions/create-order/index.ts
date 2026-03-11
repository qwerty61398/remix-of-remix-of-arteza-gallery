import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { customer_name, customer_email, customer_phone, shipping_address, notes, items } = await req.json();

    // Validate required fields
    if (!customer_name || !customer_email || !shipping_address || !items?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate input lengths
    if (customer_name.length > 100 || customer_email.length > 255 || shipping_address.length > 500) {
      return new Response(JSON.stringify({ error: "Input exceeds maximum length" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.painting_title || typeof item.painting_title !== "string") {
        return new Response(JSON.stringify({ error: "Each item must have a painting_title" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity < 1 || !Number.isInteger(item.quantity)) {
        return new Response(JSON.stringify({ error: "Each item must have a valid quantity (positive integer)" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Get user ID from auth header if present
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (authHeader) {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "";
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: { user } } = await userClient.auth.getUser();
      userId = user?.id || null;
    }

    // Fetch verified prices from the paintings table
    const paintingTitles = items.map((item: any) => item.painting_title);
    const { data: paintings, error: paintingsError } = await supabase
      .from("paintings")
      .select("id, title, price, is_available")
      .in("title", paintingTitles);

    if (paintingsError) throw paintingsError;

    // Build a lookup map by title
    const paintingMap = new Map<string, { id: string; price: number; is_available: boolean }>();
    for (const p of paintings || []) {
      paintingMap.set(p.title, { id: p.id, price: Number(p.price), is_available: p.is_available !== false });
    }

    // Validate all paintings exist and are available
    const verifiedItems: { painting_id: string; painting_title: string; price: number; quantity: number }[] = [];
    let serverTotal = 0;

    for (const item of items) {
      const painting = paintingMap.get(item.painting_title);
      if (!painting) {
        return new Response(JSON.stringify({ error: `Painting not found: "${item.painting_title}"` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!painting.is_available) {
        return new Response(JSON.stringify({ error: `Painting is not available: "${item.painting_title}"` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const lineTotal = painting.price * item.quantity;
      serverTotal += lineTotal;

      verifiedItems.push({
        painting_id: painting.id,
        painting_title: item.painting_title,
        price: painting.price,
        quantity: item.quantity,
      });
    }

    // Insert order with server-calculated total
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name,
        customer_email,
        customer_phone: customer_phone || null,
        shipping_address,
        total_amount: serverTotal,
        user_id: userId,
        notes: notes || null,
      })
      .select("id")
      .single();

    if (orderError) throw orderError;

    // Insert order items with verified prices and painting IDs
    const orderItems = verifiedItems.map((item) => ({
      order_id: order.id,
      painting_id: item.painting_id,
      painting_title: item.painting_title,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return new Response(JSON.stringify({ id: order.id, total_amount: serverTotal }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred processing your order" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
