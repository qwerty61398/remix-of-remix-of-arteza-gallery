import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Painting } from "@/data/paintings";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  painting: Painting;
  variant?: "default" | "compact";
}

export function ArtworkCard({ painting, variant = "default" }: ArtworkCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article className="group relative">
      <Link to={`/shop/${painting.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={painting.image}
            alt={painting.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className={cn("mt-4 space-y-2", variant === "compact" && "mt-3 space-y-1")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link to={`/shop/${painting.id}`}>
              <h3 className={cn(
                "font-serif font-medium text-foreground hover:text-primary transition-colors line-clamp-1",
                variant === "compact" ? "text-base" : "text-lg"
              )}>
                {painting.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{painting.dimensions}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">
            {formatPrice(painting.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addToCart(painting)}
            disabled={!painting.available}
            className="gap-1.5"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>

        {variant === "default" && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {painting.description}
          </p>
        )}
      </div>
    </article>
  );
}
