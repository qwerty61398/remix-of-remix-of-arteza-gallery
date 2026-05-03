import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { collections } from "@/data/paintings";
import { usePaintings } from "@/hooks/use-paintings";
import { useTypewriter } from "@/hooks/use-typewriter";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

const HERO_PHRASES = ["the Future", "Your Potential", "a Better World", "the Noise", "the Dreamer", "the Wanderer", "the Soul", "the Heart", "Your Story"];

export default function HomePage() {
  const { data: paintings = [], isLoading } = usePaintings();
  const featuredPaintings = paintings.slice(0, 8);
  const instagramPaintings = paintings.slice(-6);
  const heroImage = paintings[4]?.image;
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
      {/* 1. Hero — shorter, simplified */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
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

        <div className="container px-4 py-16 flex flex-col items-center text-center">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-3">
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                Art That <span className="text-primary">Speaks</span> to
              </h1>
              <div className="mt-2 md:mt-3 h-[3.5rem] md:h-[4.5rem] flex items-start justify-center animate-fade-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
                <span className="font-serif text-4xl md:text-6xl font-bold text-primary">
                  {text}
                </span>
                <span className="animate-blink font-serif text-4xl md:text-6xl font-bold text-primary">|</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                Original paintings that capture emotion, culture, and the breathtaking beauty of our world — handcrafted by artist Upasna.
              </p>
            </div>

            <div className="flex justify-center animate-fade-up opacity-0 [animation-delay:1100ms] [animation-fill-mode:forwards]">
              <Link to="/shop">
                <Button size="lg" className="gap-2 btn-press">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-2 text-sm text-muted-foreground animate-fade-up opacity-0 [animation-delay:1400ms] [animation-fill-mode:forwards]">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <span>Original Paintings</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">20+</span> Artworks Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet the Artist */}
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

      {/* 3. Featured Artworks — dynamic carousel */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full aspect-square rounded-lg" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="px-2 md:px-8">
              <FeaturedCarousel paintings={featuredPaintings} />
            </div>
          )}
        </div>
      </section>

      {/* 4. Explore Collections */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.slice(0, 3).map((collection, i) => (
              <StaggerItem key={collection.slug} index={i}>
                <CollectionCard
                  name={collection.name}
                  description={collection.description}
                  slug={collection.slug}
                />
              </StaggerItem>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.slice(3).map((collection, i) => (
              <StaggerItem key={collection.slug} index={i + 3}>
                <CollectionCard
                  name={collection.name}
                  description={collection.description}
                  slug={collection.slug}
                />
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Instagram feed */}
      <InstagramFeed paintings={instagramPaintings} url="https://instagram.com" />

      {/* 6. Newsletter signup */}
      <NewsletterSignup />
    </div>
  );
}
