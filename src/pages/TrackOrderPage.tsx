import { useState } from "react";
import { Search, Package, Clock, CheckCircle, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

interface TrackedOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

interface TrackedItem {
  painting_title: string;
  quantity: number;
  price: number;
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Order Received", icon: Clock, color: "text-amber-600" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-600" },
  processing: { label: "Processing", icon: Package, color: "text-purple-600" },
  shipped: { label: "Shipped", icon: Truck, color: "text-green-600" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600" },
  cancelled: { label: "Cancelled", icon: Clock, color: "text-destructive" },
};

const statusSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [items, setItems] = useState<TrackedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

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
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);
    setItems([]);
    setSearched(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("track-order", {
        body: { order_id: orderId.trim() },
      });

      if (fnError) throw fnError;
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data.order);
        setItems(data.items || []);
      }
    } catch {
      setError("Could not look up your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;
  const isCancelled = order?.status === "cancelled";
  const config = order ? statusConfig[order.status] || statusConfig.pending : null;

  return (
    <div className="py-12">
      <div className="container px-4 max-w-2xl mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Track Your Order
            </h1>
            <p className="text-muted-foreground">
              Enter your Order ID to check the current status of your order.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          <form onSubmit={handleTrack} className="flex gap-3 mb-10">
            <Input
              placeholder="Enter Order ID (e.g. A1B2C3D4)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              className="font-mono text-sm"
            />
            <Button type="submit" disabled={loading || !orderId.trim()} className="gap-2 shrink-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Track
            </Button>
          </form>
        </ScrollReveal>

        {error && searched && (
          <ScrollReveal variant="fade-up">
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{error}</p>
            </div>
          </ScrollReveal>
        )}

        {order && (
          <ScrollReveal variant="fade-up">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              {/* Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm font-medium text-foreground">
                    {order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-muted-foreground">Placed on</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                {config && (
                  <Badge variant={isCancelled ? "destructive" : "default"} className="gap-1.5">
                    <config.icon className="h-3.5 w-3.5" />
                    {config.label}
                  </Badge>
                )}
              </div>

              {/* Progress Tracker */}
              {!isCancelled && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      {statusSteps.map((step, idx) => {
                        const stepConf = statusConfig[step];
                        const isActive = idx <= currentStepIndex;
                        return (
                          <div key={step} className="flex flex-col items-center flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {idx + 1}
                            </div>
                            <span className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 text-center leading-tight">
                              {stepConf.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center px-4 -mt-[52px] mb-8">
                      {statusSteps.slice(0, -1).map((_, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 h-0.5 ${
                            idx < currentStepIndex ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Customer Info */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Customer</p>
                  <p className="text-foreground">{order.customer_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground">{order.customer_email}</p>
                </div>
              </div>

              {/* Items */}
              {items.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-foreground mb-3">
                      Items
                    </h2>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Qty</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.painting_title}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow className="font-semibold">
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell className="text-right">{formatPrice(order.total_amount)}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </>
              )}

              {/* Last Updated */}
              <Separator />
              <p className="text-xs text-muted-foreground text-center">
                Last updated: {formatDate(order.updated_at)}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
