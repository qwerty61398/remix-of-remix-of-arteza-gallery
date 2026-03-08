import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaintingById, getPaintingsByCollection } from "@/data/paintings";
import { useCart } from "@/contexts/CartContext";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

export default function PaintingDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const painting = getPaintingById(id || "");

  if (!painting) {
    return (
      <div className="container px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold mb-4">Painting not found</h1>
        <Link to="/shop">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const relatedPaintings = getPaintingsByCollection(painting.collection)
    .filter(p => p.id !== painting.id)
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-8">
      <div className="container px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal variant="fade-left">
            <div className="rounded-xl overflow-hidden img-zoom">
              <img
                src={painting.image}
                alt={painting.title}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={150}>
            <div className="space-y-8">
              <div>
                <p className="text-sm text-primary font-medium mb-2">{painting.collection}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {painting.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">{painting.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-foreground">{formatPrice(painting.price)}</span>
                  {painting.available && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Available
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  <span>Size: {painting.dimensions}</span>
                  <span>Medium: {painting.medium}</span>
                  <span>Material: {painting.material}</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => addToCart(painting)}
                disabled={!painting.available}
                className="w-full gap-2 btn-press"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>

              <div className="border-t border-border pt-8 space-y-4">
                <h3 className="font-semibold text-foreground">About this Painting</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Original hand-painted artwork</li>
                  <li>• Signed by the artist</li>
                  <li>• Certificate of authenticity included</li>
                  <li>• Secure packaging for shipping</li>
                  <li>• Free shipping across India</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {relatedPaintings.length > 0 && (
          <div className="mt-20">
            <ScrollReveal>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                More from {painting.collection}
              </h2>
            </ScrollReveal>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {relatedPaintings.map((p, i) => (
                <StaggerItem key={p.id} index={i} className="break-inside-avoid">
                  <ArtworkCard painting={p} variant="compact" />
                </StaggerItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
