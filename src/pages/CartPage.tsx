import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { items, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any paintings yet.
          </p>
          <Link to="/shop">
            <Button className="gap-2">
              Browse Paintings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.painting.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.painting.image}
                    alt={item.painting.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/shop/${item.painting.id}`}>
                    <h3 className="font-serif font-medium text-foreground hover:text-primary transition-colors">
                      {item.painting.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.painting.dimensions}</p>
                  <p className="text-sm text-muted-foreground">{item.painting.collection}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold text-foreground">
                    {formatPrice(item.painting.price)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.painting.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 gap-2" onClick={() => navigate("/checkout")}>
                Proceed to Payment
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout powered by trusted payment gateway
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
