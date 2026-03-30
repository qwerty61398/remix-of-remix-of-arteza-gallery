import { ArrowRight } from "lucide-react";
import { usePaintings } from "@/hooks/use-paintings";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/paintings";

/* ─── Full-bleed image section ─── */
function FullBleedImage({
  src,
  alt,
  overlay,
  children,
  className = "",
}: {
  src?: string;
  alt: string;
  overlay?: "dark" | "light";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${className}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {overlay === "dark" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      )}
      {overlay === "light" && (
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      )}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </section>
  );
}

/* ─── Pull quote ─── */
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal variant="blur-in">
      <blockquote className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <p className="pull-quote text-2xl md:text-4xl lg:text-5xl text-primary/80">
          "{children}"
        </p>
      </blockquote>
    </ScrollReveal>
  );
}

/* ─── Narrative text block ─── */
function NarrativeBlock({
  chapter,
  title,
  children,
  dark = false,
}: {
  chapter?: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`py-20 md:py-32 ${dark ? "bg-foreground" : "bg-background"}`}>
      <div className="container px-6 max-w-3xl mx-auto">
        <ScrollReveal variant="fade-up">
          {chapter && (
            <span
              className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${
                dark ? "text-primary-foreground/60" : "text-primary"
              }`}
            >
              {chapter}
            </span>
          )}
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight ${
              dark ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={150}>
          <div
            className={`space-y-6 text-lg leading-relaxed ${
              dark ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}
          >
            {children}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { data: paintings = [] } = usePaintings();

  // Helper to safely get a painting image
  const img = (index: number) => paintings[index]?.image;

  return (
    <div className="-mt-1">
      {/* ═══════ HERO ═══════ */}
      <FullBleedImage
        src={img(0)}
        alt="Featured artwork"
        overlay="dark"
        className="min-h-screen"
      >
        <div className="container px-6 text-center">
          <ScrollReveal variant="blur-in">
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6 text-shadow-sm">
              The Story Behind the Art
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-white text-shadow leading-[1.1] max-w-4xl mx-auto">
              I paint because words were never enough.
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={400}>
            <p className="mt-8 text-white/70 text-lg md:text-xl max-w-xl mx-auto text-shadow-sm">
              A journey through colour, culture, and the quiet spaces between brushstrokes.
            </p>
          </ScrollReveal>
        </div>
      </FullBleedImage>

      {/* ═══════ CHAPTER 1: THE BEGINNING ═══════ */}
      <NarrativeBlock chapter="Chapter One" title="The Beginning">
        <p>
          I remember the first time colour spoke to me. I was five, sitting on the cool marble
          floor of my grandmother's house, watching her draw <em>alpana</em> patterns with rice
          paste on the threshold. The white swirls against the red oxide floor were magic — simple
          lines creating a whole universe at the doorstep.
        </p>
        <p>
          Every festival brought an explosion of pigment. Rangoli powders in impossible greens and
          magentas, marigold garlands dripping gold, the deep indigo of my mother's sari as she
          lit oil lamps at dusk. I didn't know then that I was training my eye. I just knew the
          world was unbearably beautiful and I wanted to hold onto it.
        </p>
        <p>
          My first "studio" was a corner of the verandah. Watercolours from a tin box, a chipped
          ceramic plate for a palette, and stolen sheets of my father's office paper. I painted
          everything — the neighbour's cat, the banyan tree, the clouds that looked like elephants.
          Nobody told me I was an artist. I simply couldn't stop.
        </p>
      </NarrativeBlock>

      {/* Full-bleed painting break */}
      <FullBleedImage src={img(9)} alt="Early artwork" overlay="dark">
        <ScrollReveal variant="blur-in">
          <p className="text-center text-white/90 font-serif italic text-xl md:text-2xl text-shadow max-w-2xl mx-auto px-6">
            Those early sketches were clumsy, honest, and full of wonder — everything art should be.
          </p>
        </ScrollReveal>
      </FullBleedImage>

      {/* ═══════ CHAPTER 2: THE TURNING POINT ═══════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <ScrollReveal variant="fade-left">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl img-zoom">
                {img(5) && (
                  <img src={img(5)} alt="Madhubani inspired work" className="h-full w-full object-cover" />
                )}
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-right">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
                  Chapter Two
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Roots in Heritage
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Under the guidance of master artists, I entered the intricate world of Madhubani
                    painting. For months, I practiced nothing but lines — the confident, unbroken
                    lines that form the backbone of this ancient art. My hand ached. My patience
                    was tested. But slowly, the lines began to breathe.
                  </p>
                  <p>
                    I learned that every motif carries meaning: the fish for fertility, the peacock
                    for love, the lotus for purity. Each painting was a prayer rendered in pigment,
                    a meditation that connected me to generations of women who had painted these
                    same symbols on mud walls for centuries.
                  </p>
                  <p>
                    This training gave me discipline. It taught me that art is not just expression —
                    it is devotion.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PullQuote>
        Art is not just expression — it is devotion. Every motif is a prayer, every line a meditation.
      </PullQuote>

      {/* ═══════ CHAPTER 3: TWO WORLDS COLLIDE ═══════ */}
      <FullBleedImage src={img(2)} alt="Western-influenced painting" overlay="dark" className="min-h-[80vh]">
        <div className="container px-6 max-w-3xl mx-auto">
          <ScrollReveal variant="fade-up">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-4">
              Chapter Three
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white text-shadow leading-tight mb-8">
              Two Worlds Collide
            </h2>
            <div className="space-y-5 text-lg text-white/80 text-shadow-sm leading-relaxed">
              <p>
                Then came oil paints — thick, forgiving, gloriously slow to dry. I fell in love
                with the impressionists first: Monet's haystacks dissolving in light, Renoir's
                skin tones that seemed to glow from within. The freedom was intoxicating after
                years of precise, symmetrical forms.
              </p>
              <p>
                I spent a year doing nothing but colour studies. Mixing cerulean with cadmium
                yellow to find that exact shade of afternoon light on a mango tree. Layering
                transparent glazes until a canvas hummed with depth. Western technique gave me
                permission to be messy, to let the paint itself become the subject.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </FullBleedImage>

      {/* ═══════ CHAPTER 4: PHILOSOPHY ═══════ */}
      <NarrativeBlock chapter="Chapter Four" title="Every Brushstroke Is a Conversation" dark>
        <p>
          People ask me what my paintings mean. I never have a clean answer. A painting starts
          as a feeling — maybe the way morning light hits a terracotta wall, or a melody that
          won't leave my head. I don't plan. I listen to the canvas.
        </p>
        <p>
          My process is slow and intuitive. I begin with washes of colour, letting them bleed
          and merge. Then I build — layer upon layer — until forms emerge from the chaos. Some
          days the painting tells me exactly what it needs. Other days we argue. The best work
          comes from those arguments.
        </p>
        <p>
          I believe art should make you feel something you can't name. Not beautiful, not
          shocking — just <em>true</em>. That space between recognition and mystery is where
          I try to live.
        </p>
      </NarrativeBlock>

      <PullQuote>
        The best work comes from arguing with the canvas — from that space between recognition and mystery.
      </PullQuote>

      {/* Full-bleed painting break */}
      <FullBleedImage src={img(4)} alt="Artistic process" overlay="dark">
        <ScrollReveal variant="blur-in">
          <p className="text-center text-white/90 font-serif italic text-xl md:text-2xl text-shadow max-w-2xl mx-auto px-6">
            I don't plan. I listen to the canvas.
          </p>
        </ScrollReveal>
      </FullBleedImage>

      {/* ═══════ CHAPTER 5: THE COLLECTIONS ═══════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container px-6 max-w-3xl mx-auto mb-16">
          <ScrollReveal variant="fade-up">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-primary mb-4">
              Chapter Five
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              The Collections
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each series is a chapter of its own — a different mood, a different question.
              Together, they form the story of everything I've seen, felt, and imagined.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-0">
          {collections.map((collection, i) => {
            const collectionPainting = paintings.find((p) => p.collection === collection.name);
            return (
              <ScrollReveal key={collection.slug} variant="fade-up" delay={i * 100}>
                <Link to={`/gallery/${collection.slug}`} className="block group">
                  <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                    {collectionPainting && (
                      <img
                        src={collectionPainting.image}
                        alt={collection.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <h3 className="font-serif text-2xl md:text-4xl font-bold text-white text-shadow mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base max-w-lg text-shadow-sm">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══════ CHAPTER 6: THE STUDIO TODAY ═══════ */}
      <NarrativeBlock chapter="Chapter Six" title="The Studio Today">
        <p>
          My studio is a small, light-filled room that smells of linseed oil and strong chai.
          There's paint on the walls, the floor, and — inevitably — on my clothes. I wouldn't
          have it any other way.
        </p>
        <p>
          Today, I divide my time between creating new work, fulfilling commissions for
          collectors around the world, and teaching workshops where I share the techniques and
          philosophy that shaped my practice. Every student reminds me why I started — that
          pure, unfiltered joy of putting colour on a surface and watching something come alive.
        </p>
        <p>
          ARTEZA was born from the belief that original art should be accessible — not locked
          away in galleries but hanging in homes, sparking conversations, becoming part of
          people's daily lives. Every painting I ship carries a piece of my story, and it makes
          me endlessly happy to know it will become part of someone else's.
        </p>
      </NarrativeBlock>

      {/* ═══════ FINAL CTA ═══════ */}
      <FullBleedImage src={img(13)} alt="Latest artwork" overlay="dark" className="min-h-[80vh]">
        <div className="container px-6 text-center">
          <ScrollReveal variant="blur-in">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white text-shadow leading-tight max-w-3xl mx-auto mb-6">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 text-shadow-sm">
              Explore the full ARTEZA collection or get in touch for commissions and inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/shop">
                  Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white/30 text-foreground bg-white hover:bg-white/90">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </FullBleedImage>
    </div>
  );
}
