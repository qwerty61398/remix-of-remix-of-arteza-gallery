import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  shipping_address: z.string().trim().min(1, "Shipping address is required").max(500, "Address must be less than 500 characters"),
  notes: z.string().trim().max(1000, "Notes must be less than 1000 characters").optional().or(z.literal("")),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      shipping_address: "",
      notes: "",
    },
  });

  // Pre-fill for authenticated users
  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.full_name || "";
      const email = user.email || "";
      form.setValue("name", fullName);
      form.setValue("email", email);
    }
  }, [user, form]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-6">
            Add some paintings before checking out.
          </p>
          <Link to="/shop">
            <Button>Browse Paintings</Button>
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const response = await supabase.functions.invoke("create-order", {
        body: {
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone || null,
          shipping_address: values.shipping_address,
          total_amount: totalPrice,
          notes: values.notes || null,
          items: items.map((item) => ({
            painting_title: item.painting.title,
            price: item.painting.price,
            quantity: item.quantity,
          })),
        },
      });

      if (response.error) throw response.error;
      const order = response.data;

      const orderState = {
        order: {
          id: order.id,
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone || null,
          shipping_address: values.shipping_address,
          total_amount: totalPrice,
          created_at: new Date().toISOString(),
        },
        items: items.map((item) => ({
          painting_title: item.painting.title,
          price: item.painting.price,
          quantity: item.quantity,
        })),
      };

      clearCart();
      navigate(`/order-confirmation/${order.id}`, { state: orderState });
    } catch (error: any) {
      toast({
        title: "Order failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container px-4">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Contact Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Shipping Address
                  </h2>
                  <FormField
                    control={form.control}
                    name="shipping_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Street address, city, state, PIN code"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Additional Notes
                  </h2>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions for your order"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatPrice(totalPrice)}`
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.painting.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.painting.image}
                        alt={item.painting.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.painting.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatPrice(item.painting.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
