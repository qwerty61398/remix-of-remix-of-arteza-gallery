import { Link } from "react-router-dom";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { collections } from "@/data/paintings";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  return (
    <div className="py-12">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Art Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our curated collections, each telling a unique story through color, 
            form, and emotion. Click on any collection to discover the artworks within.
          </p>
          
          <Link to="/quiz">
            <Button variant="outline" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Not sure which collection suits you? Take our Art Style Quiz
            </Button>
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              name={collection.name}
              description={collection.description}
              slug={collection.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
