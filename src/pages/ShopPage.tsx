import { useState } from "react";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { paintings, collections, CollectionType } from "@/data/paintings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [selectedCollection, setSelectedCollection] = useState<CollectionType | "all">("all");

  const filteredPaintings = selectedCollection === "all"
    ? paintings
    : paintings.filter(p => p.collection === selectedCollection);

  return (
    <div className="py-12">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop Original Paintings
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each painting is a unique, original work created by Upasna. 
            Bring home a piece of art that speaks to your soul.
          </p>
        </div>

        {/* Collection Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedCollection === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCollection("all")}
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
                selectedCollection !== collection.name && "text-muted-foreground"
              )}
            >
              {collection.name}
            </Button>
          ))}
        </div>

        {/* Paintings Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {filteredPaintings.map((painting) => (
            <div key={painting.id} className="break-inside-avoid">
              <ArtworkCard painting={painting} />
            </div>
          ))}
        </div>

        {filteredPaintings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No paintings found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
