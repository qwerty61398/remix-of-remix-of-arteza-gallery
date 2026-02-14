import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  created_at: string;
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (!orderId) return;
    supabase
      .from("orders")
      .select("id, customer_name, customer_email, total_amount, created_at")
      .eq("id", orderId)
      .single()
      .then(({ data }) => {
        if (data) setOrder(data);
      });
  }, [orderId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. We'll send a confirmation to{" "}
          <span className="font-medium text-foreground">
            {order?.customer_email || "your email"}
          </span>.
        </p>

        {order && (
          <div className="bg-card border border-border rounded-xl p-6 text-left mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-foreground text-xs">
                {order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-foreground">
                {formatPrice(order.total_amount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-foreground">Processing</span>
            </div>
          </div>
        )}

        <Link to="/shop">
          <Button className="gap-2">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
