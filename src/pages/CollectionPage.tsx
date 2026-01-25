import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { getCollectionBySlug, getPaintingsByCollection, CollectionType } from "@/data/paintings";

export default function CollectionPage() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug || "");

  if (!collection) {
    return (
      <div className="container px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold mb-4">Collection not found</h1>
        <Link to="/gallery" className="text-primary hover:underline">
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  const paintings = getPaintingsByCollection(collection.name as CollectionType);

  return (
    <div className="py-12">
      <div className="container px-4">
        {/* Back Link */}
        <Link 
          to="/gallery" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {collection.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>

        {/* Paintings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paintings.map((painting) => (
            <ArtworkCard key={painting.id} painting={painting} />
          ))}
        </div>

        {paintings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No paintings in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
