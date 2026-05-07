import { Link } from "react-router-dom";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { collections } from "@/data/paintings";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

export default function GalleryPage() {
  return (
    <div className="py-12">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Collections
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our curated collections, each telling a unique story through color,
              form, and emotion. Click on any collection to discover the artworks within.
            </p>
            <Link to="/quiz">
              <Button variant="outline" className="gap-2 btn-press border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all">
                <Lightbulb className="h-4 w-4 text-primary" />
                Not sure? Get inspired — take our Art Style Quiz
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 place-items-center">
          {collections.map((collection, i) => (
            <StaggerItem key={collection.slug} index={i}>
              <div
                className="animate-float"
                style={{ animationDelay: `${(i % 5) * 0.4}s`, animationDuration: `${5 + (i % 3)}s` }}
              >
                <CollectionCard
                  name={collection.name}
                  description={collection.description}
                  slug={collection.slug}
                />
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </div>
  );
}
