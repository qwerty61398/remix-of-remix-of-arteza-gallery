import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { CollectionCard } from "@/components/artwork/CollectionCard";
import { paintings, collections } from "@/data/paintings";
import { useTypewriter } from "@/hooks/use-typewriter";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

import heroImage from "@/assets/paintings/floral-face.jpg";

const HERO_PHRASES = ["the Future", "Your Potential", "a Better World", "the Noise", "the Dreamer", "the Wanderer", "the Soul", "the Heart", "Your Story"];

export default function HomePage() {
  const featuredPaintings = paintings.slice(0, 4);
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
          <img
            ref={imgRef}
            src={heroImage}
            alt="Featured artwork"
            className="h-full w-full object-cover opacity-40 will-change-transform scale-110"
          />
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
                beauty of our world. Each piece is handcrafted with love by artist Upasna.
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
                <span className="font-semibold text-foreground">10+</span> Artworks Available
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

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {featuredPaintings.map((painting, i) => (
              <StaggerItem key={painting.id} index={i} className="break-inside-avoid">
                <ArtworkCard painting={painting} variant="compact" />
              </StaggerItem>
            ))}
          </div>
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

      {/* Art Style Quiz CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4">
          <ScrollReveal variant="zoom-in">
            <div className="max-w-3xl mx-auto text-center">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6 animate-float" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Discover Your Perfect Art Match
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Take our interactive quiz and find artwork that resonates with your
                unique taste and style preferences.
              </p>
              <Link to="/quiz">
                <Button size="lg" className="gap-2 btn-press">
                  Take the Quiz
                  <ArrowRight className="h-4 w-4" />
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
                  <img
                    src={paintings[8].image}
                    alt="Upasna's artwork"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-xl img-zoom">
                  <img
                    src={paintings[5].image}
                    alt="Artwork detail"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
