const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, orderId } = await req.json();

    if (!amount || !orderId) {
      return new Response(JSON.stringify({ error: "Missing amount or orderId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const upiId = Deno.env.get("UPI_ID");
    if (!upiId) {
      return new Response(JSON.stringify({ error: "UPI configuration missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const shortId = orderId.slice(0, 8).toUpperCase();
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=ARTEZA&am=${amount}&tn=Order-${shortId}&cu=INR`;

    return new Response(JSON.stringify({ upiLink }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
