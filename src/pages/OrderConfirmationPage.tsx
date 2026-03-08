import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Printer } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  shipping_address: string;
  total_amount: number;
  created_at: string;
}

interface OrderItem {
  painting_title: string;
  quantity: number;
  price: number;
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return result;
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navState = location.state as { order?: OrderData; items?: OrderItem[] } | null;

  const [order, setOrder] = useState<OrderData | null>(navState?.order ?? null);
  const [items, setItems] = useState<OrderItem[]>(navState?.items ?? []);
  useEffect(() => {
    if (!orderId || (order && items.length > 0)) return;

    const fetchOrder = async () => {
      const { data: orderData } = await supabase
        .from("orders")
        .select("id, customer_name, customer_email, customer_phone, shipping_address, total_amount, created_at")
        .eq("id", orderId)
        .single();

      if (orderData) setOrder(orderData);

      const { data: itemsData } = await supabase
        .from("order_items")
        .select("painting_title, quantity, price")
        .eq("order_id", orderId);

      if (itemsData) setItems(itemsData);
    };

    fetchOrder();
  }, [orderId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const orderDate = order ? new Date(order.created_at) : new Date();
  const deliveryStart = addBusinessDays(orderDate, 7);
  const deliveryEnd = addBusinessDays(orderDate, 10);
  const deliveryRange = `${deliveryStart.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} – ${deliveryEnd.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-in fade-in zoom-in duration-500">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll get in touch with you shortly to confirm the details.
          </p>
        </div>

        {order && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-sm font-medium text-foreground">
                  {order.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-muted-foreground">Date Placed</p>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <Badge variant={isConfirmed ? "default" : "secondary"}>
                {isConfirmed ? "Payment Confirmed" : "Payment Verification"}
              </Badge>
            </div>

            <Separator />

            {/* Itemized Receipt */}
            {items.length > 0 && (
              <>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                    Items Ordered
                  </h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.painting_title}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                          <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Subtotal</TableCell>
                        <TableCell className="text-right">{formatPrice(order.total_amount)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Shipping</TableCell>
                        <TableCell className="text-right text-green-600">Free</TableCell>
                      </TableRow>
                      <TableRow className="font-semibold">
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{formatPrice(order.total_amount)}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>

                <Separator />
              </>
            )}

            {/* Shipping Details */}
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                Shipping Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Name</p>
                  <p className="text-foreground">{order.customer_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Phone</p>
                    <p className="text-foreground">{order.customer_phone}</p>
                  </div>
                )}
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-muted-foreground">Address</p>
                  <p className="text-foreground whitespace-pre-line">{order.shipping_address}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Estimated Delivery */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="text-sm font-medium text-foreground">{deliveryRange}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/shop">
            <Button className="gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
