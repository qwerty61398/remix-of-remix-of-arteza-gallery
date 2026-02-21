import { Link } from "react-router-dom";
import { ArrowRight, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { paintings, collections } from "@/data/paintings";

// Import featured image for hero
import heroImage from "@/assets/paintings/floral-face.jpg";

export default function HomePage() {
  const featuredPaintings = paintings.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Featured artwork"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>

        <div className="container px-4 py-20">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-foreground">
                Art That <span className="text-primary">Speaks</span> to Your Soul
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover original paintings that capture emotion, culture, and the breathtaking 
                beauty of our world. Each piece is handcrafted with love by artist Upasna.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Find Your Style</span>
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Original Paintings</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">10+</span> Artworks Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Artworks
              </h2>
              <p className="text-muted-foreground">
                Handpicked masterpieces from our latest collection
              </p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {featuredPaintings.map((painting) => (
              <div key={painting.id} className="break-inside-avoid">
                <ArtworkCard painting={painting} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explore Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse curated collections that reflect different themes, emotions, and artistic styles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.slice(0, 3).map((collection) => (
              <CollectionCard
                key={collection.slug}
                name={collection.name}
                description={collection.description}
                slug={collection.slug}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.slice(3).map((collection) => (
              <CollectionCard
                key={collection.slug}
                name={collection.name}
                description={collection.description}
                slug={collection.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Art Style Quiz CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Your Perfect Art Match
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take our interactive quiz and find artwork that resonates with your 
              unique taste and style preferences.
            </p>
            <Link to="/quiz">
              <Button size="lg" className="gap-2">
                Take the Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Meet the Artist
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Upasna is a passionate artist whose work spans multiple styles and themes. 
                From the vibrant traditions of Madhubani art to contemporary abstract expressions, 
                each painting tells a unique story.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With every brushstroke, she aims to evoke emotion and create connections 
                that transcend the canvas.
              </p>
              <Link to="/about">
                <Button variant="outline" className="gap-2">
                  Learn More About Upasna
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src={paintings[8].image}
                  alt="Upasna's artwork"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={paintings[5].image}
                  alt="Artwork detail"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
