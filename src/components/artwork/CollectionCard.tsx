import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getPaintingsByCollection, CollectionType } from "@/data/paintings";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";

interface CollectionCardProps {
  name: CollectionType;
  description: string;
  slug: string;
}

export function CollectionCard({ name, description, slug }: CollectionCardProps) {
  const paintings = getPaintingsByCollection(name);
  const featuredImage = paintings[0]?.image;

  return (
    <Link to={`/gallery/${slug}`} className="group relative block overflow-hidden rounded-xl bg-card hover-lift">
      <div className="aspect-[4/3] overflow-hidden img-zoom">
        {featuredImage && (
          <img src={featuredImage} alt={name} className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-secondary-foreground bg-primary-foreground">
        <h3 className="font-serif text-xl font-semibold mb-2 text-muted-foreground">
          {name}
        </h3>
        <p className="text-sm line-clamp-2 mb-3 text-muted-foreground">
          {description}
        </p>
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <span>Explore Collection</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
