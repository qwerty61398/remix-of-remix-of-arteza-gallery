import { useState } from "react";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { paintings, collections, CollectionType } from "@/data/paintings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

export default function ShopPage() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionType | "all">("all");

  const filteredPaintings = selectedCollection === "all"
    ? paintings
    : paintings.filter(p => p.collection === selectedCollection);

  return (
    <div className="py-12">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shop Original Paintings
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each painting is a unique, original work created by Upasna.
              Bring home a piece of art that speaks to your soul.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedCollection === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCollection("all")}
              className="btn-press"
            >
              All
            </Button>
            {collections.map((collection) => (
              <Button
                key={collection.slug}
                variant={selectedCollection === collection.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCollection(collection.name)}
                className={cn(
                  "btn-press",
                  selectedCollection !== collection.name && "text-muted-foreground"
                )}
              >
                {collection.name}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {filteredPaintings.map((painting, i) => (
            <StaggerItem key={painting.id} index={i} className="break-inside-avoid">
              <ArtworkCard painting={painting} />
            </StaggerItem>
          ))}
        </div>

        {filteredPaintings.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-muted-foreground">No paintings found in this collection.</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
