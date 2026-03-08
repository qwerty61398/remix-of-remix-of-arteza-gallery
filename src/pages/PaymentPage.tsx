import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface OrderState {
  order: {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    shipping_address: string;
    total_amount: number;
    created_at: string;
  };
  items: {
    painting_title: string;
    price: number;
    quantity: number;
  }[];
}

const WHATSAPP_NUMBER = "919711804497";

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state as OrderState | null;

  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const order = navState?.order;
  const items = navState?.items ?? [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  useEffect(() => {
    if (!orderId || !order) return;

    const fetchUpiLink = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("generate-upi-qr", {
          body: { amount: order.total_amount, orderId },
        });
        if (fnError) throw fnError;
        setUpiLink(data.upiLink);
      } catch (err: any) {
        setError(err.message || "Failed to generate payment QR code");
      } finally {
        setLoading(false);
      }
    };

    fetchUpiLink();
  }, [orderId, order]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">Order not found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the order details.</p>
          <Button onClick={() => navigate("/shop")}>Browse Paintings</Button>
        </div>
      </div>
    );
  }

  const shortId = orderId?.slice(0, 8).toUpperCase() ?? "";
  const whatsappMessage = encodeURIComponent(
    `Hi! I've made the payment for Order #${shortId}, Amount: ${formatPrice(order.total_amount)}. Please find the payment screenshot attached.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleConfirmSent = () => {
    navigate(`/order-confirmation/${orderId}`, {
      state: {
        order: navState?.order,
        items: navState?.items,
      },
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground">
            Scan the QR code below with any UPI app to pay
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          {/* Order Summary */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm font-medium text-foreground">{shortId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-xl font-bold text-foreground">{formatPrice(order.total_amount)}</p>
            </div>
          </div>

          <Separator />

          {/* QR Code */}
          <div className="flex flex-col items-center gap-4">
            {loading ? (
              <div className="w-64 h-64 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="w-64 h-64 flex items-center justify-center text-center">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            ) : upiLink ? (
              <>
                <div className="bg-background p-4 rounded-xl">
                  <QRCodeSVG
                    value={upiLink}
                    size={240}
                    level="H"
                    includeMargin
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Open Google Pay, PhonePe, Paytm or any UPI app and scan this code
                </p>
              </>
            ) : null}
          </div>

          <Separator />

          {/* Items */}
          {items.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Items</p>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.painting_title} × {item.quantity}
                  </span>
                  <span className="text-foreground">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}

          <Separator />

          {/* Steps */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">After paying:</p>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Take a screenshot of your payment confirmation
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Send the screenshot via WhatsApp using the button below
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We'll verify your payment and confirm your order
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full gap-2" size="lg">
                <FaWhatsapp className="h-5 w-5" />
                Send Payment Screenshot via WhatsApp
              </Button>
            </a>
            <Button
              variant="outline"
              className="w-full gap-2"
              size="lg"
              onClick={handleConfirmSent}
            >
              <CheckCircle className="h-4 w-4" />
              I've Sent the Screenshot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
