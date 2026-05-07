import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CollectionType } from "@/data/paintings";
import { usePaintingsByCollection } from "@/hooks/use-paintings";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";

interface CollectionCardProps {
  name: CollectionType;
  description: string;
  slug: string;
}

export function CollectionCard({ name, description, slug }: CollectionCardProps) {
  const { data: paintings = [] } = usePaintingsByCollection(name);
  const featuredImage = paintings[0]?.image;

  return (
    <Link
      to={`/gallery/${slug}`}
      aria-label={`Open ${name} collection`}
      className="bubble group relative block mx-auto aspect-square w-full max-w-[320px] rounded-full overflow-hidden shadow-xl ring-1 ring-border/40 transition-all duration-500 ease-out hover:scale-110 hover:shadow-2xl hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Background image */}
      {featuredImage ? (
        <ImageWithSkeleton
          src={featuredImage}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
      )}

      {/* Soft overlay always visible for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />

      {/* Glossy bubble highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--background)/0.45),transparent_45%)]" />

      {/* Title (always visible) */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-center transition-all duration-500 group-hover:translate-y-[-4px]">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground drop-shadow-sm">
          {name}
        </h3>
      </div>

      {/* Expanded content on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 bg-background/55 backdrop-blur-sm">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
          {description}
        </p>
        <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
