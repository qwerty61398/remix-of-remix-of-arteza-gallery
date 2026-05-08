import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { collections } from "@/data/paintings";
import { usePaintings } from "@/hooks/use-paintings";
import { useTypewriter } from "@/hooks/use-typewriter";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";

const HERO_PHRASES = ["the Future", "Your Potential", "a Better World", "the Noise", "the Dreamer", "the Wanderer", "the Soul", "the Heart", "Your Story"];

export default function HomePage() {
  const { data: paintings = [], isLoading } = usePaintings();
  const featuredPaintings = paintings;
  const kioskItems = featuredPaintings.length > 0 ? [...featuredPaintings, ...featuredPaintings] : [];
  const heroImage = paintings[4]?.image; // Azure Veil
  const { text } = useTypewriter({ words: HERO_PHRASES });
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        imgRef.current.style.transform = `translateY(${scrollProgress * 0.4}px) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {heroImage && (
            <img
              ref={imgRef}
              src={heroImage}
              alt="Featured artwork"
              className="h-full w-full object-cover opacity-40 will-change-transform scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>

        <div className="container px-4 py-20 flex flex-col items-center text-center">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-foreground animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                Art That <span className="text-primary">Speaks</span> to
              </h1>
              <div className="mt-2 md:mt-4 h-[4rem] md:h-[5.5rem] flex items-start justify-center animate-fade-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
                <span className="font-serif text-5xl md:text-7xl font-bold text-primary">
                  {text}
                </span>
                <span className="animate-blink font-serif text-5xl md:text-7xl font-bold text-primary">|</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                Discover original paintings that capture emotion, culture, and the breathtaking
                beauty of our world. Each piece is handcrafted with love
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-up opacity-0 [animation-delay:1100ms] [animation-fill-mode:forwards]">
              <Link to="/shop">
                <Button size="lg" className="gap-2 btn-press">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2 btn-press border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Get Inspired</span>
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground animate-fade-up opacity-0 [animation-delay:1400ms] [animation-fill-mode:forwards]">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Original Paintings</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">100+</span> Artworks Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <ScrollReveal>
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
                <Button variant="ghost" className="gap-2 btn-press">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-64 h-64 rounded-lg flex-shrink-0" />
              ))}
            </div>
          ) : (
            <div className="kiosk relative overflow-hidden -mx-4 px-4">
              <div
                className="kiosk-track flex gap-6 w-max"
                style={{ animation: `kiosk-scroll ${Math.max(40, featuredPaintings.length * 6)}s linear infinite` }}
              >
                {kioskItems.map((painting, i) => (
                  <Link
                    key={`${painting.id}-${i}`}
                    to={`/shop/${painting.id}`}
                    className="kiosk-item group relative flex-shrink-0 w-56 sm:w-64 aspect-square rounded-lg overflow-hidden shadow-md ring-1 ring-border/40 transition-all duration-300 hover:shadow-2xl hover:ring-primary/40 hover:scale-[1.03]"
                    aria-label={`View ${painting.title}`}
                  >
                    <ImageWithSkeleton
                      src={painting.image}
                      alt={painting.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <h3 className="font-serif text-sm font-medium text-foreground line-clamp-1 drop-shadow-sm">
                        {painting.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="py-20">
        <div className="container px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Explore Collections
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse curated collections that reflect different themes, emotions, and artistic styles
              </p>
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
      </section>

      {/* Art Style Quiz CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <ScrollReveal variant="zoom-in">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-10 w-10 text-primary animate-float" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Light Up Your Art Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Take our interactive quiz and discover artwork that sparks
                your imagination and matches your unique taste.
              </p>
              <Link to="/quiz">
                <Button size="lg" className="gap-2 btn-press bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(258_89%_66%/0.3)] hover:shadow-[0_0_30px_hsl(258_89%_66%/0.4)] transition-all">
                  <Lightbulb className="h-4 w-4" />
                  Get Inspired
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="fade-left">
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
                  <Button variant="outline" className="gap-2 btn-press">
                    Learn More About Upasna
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-right">
              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden img-zoom">
                  {paintings[8] && (
                    <img
                      src={paintings[8].image}
                      alt="Upasna's artwork"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {paintings[5] && (
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-xl img-zoom">
                    <img
                      src={paintings[5].image}
                      alt="Artwork detail"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
