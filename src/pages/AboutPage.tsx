import { Frame, Award, Heart, ArrowRight } from "lucide-react";
import { paintings } from "@/data/paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const timeline = [
  {
    year: "Early Years",
    title: "A Spark of Colour",
    description:
      "Growing up surrounded by the vibrant hues of Indian festivals and nature's endless palette, young Upasna discovered her love for art through childhood sketches and her first experiments with watercolours. Every blank wall and scrap of paper became a canvas for her budding imagination.",
    paintingIndex: 9,
  },
  {
    year: "Traditional Training",
    title: "Roots in Heritage",
    description:
      "Under the guidance of master artists, Upasna immersed herself in the intricate world of Madhubani and other classical Indian art forms. She learned the discipline of line, the symbolism of motifs, and the meditative patience that transforms pigment into prayer.",
    paintingIndex: 5,
  },
  {
    year: "Western Exploration",
    title: "Broadening the Horizon",
    description:
      "Drawn to the bold freedom of impressionism and expressionism, Upasna explored oil painting techniques and Western composition. This period of cross-cultural study expanded her visual vocabulary and gave her the tools to bridge two artistic worlds.",
    paintingIndex: 2,
  },
  {
    year: "Finding Her Voice",
    title: "East Meets West",
    description:
      "The fusion crystallised — Madhubani precision meets expressionist passion. Upasna developed a signature style that honours India's artistic legacy while speaking a universal language of colour and emotion. Each piece became a conversation between tradition and modernity.",
    paintingIndex: 4,
  },
  {
    year: "ARTEZA Born",
    title: "Sharing Art with the World",
    description:
      "With a growing body of work and collectors spanning continents, Upasna launched ARTEZA — a curated collection that invites art lovers into her world. Every painting carries a story, a memory, and an invitation to feel deeply.",
    paintingIndex: 0,
  },
  {
    year: "Today & Beyond",
    title: "An Ever-Evolving Canvas",
    description:
      "Today, Upasna continues to push boundaries — accepting commissions, teaching art workshops, and exploring new mediums. Her mission remains unchanged: to create art that speaks to the soul and makes the world a more beautiful place.",
    paintingIndex: 13,
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="container px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="fade-left">
            <div className="space-y-6">
              <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary">
                The Story Behind the Art
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Meet <span className="text-primary">Upasna</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                A contemporary artist bridging traditional Indian art forms and
                modern expressionism — creating paintings that speak to the soul,
                one brushstroke at a time.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-2xl img-zoom">
                <img
                  src={paintings[8].image}
                  alt="Upasna's Art"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-background img-zoom hidden md:block">
                <img
                  src={paintings[5].image}
                  alt="Artwork detail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-background img-zoom hidden md:block">
                <img
                  src={paintings[6].image}
                  alt="Artwork detail"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="container px-4 mb-24">
        <ScrollReveal variant="blur-in">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-3">
              The Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              From First Brushstroke to ARTEZA
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden" />

          {timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <StaggerItem key={item.year} index={i} variant="zoom-in">
                <div className="relative mb-16 last:mb-0">
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 top-8 z-10 ring-4 ring-background" />

                  <div
                    className={`md:grid md:grid-cols-2 md:gap-12 items-center pl-14 md:pl-0 ${
                      isEven ? "" : "md:direction-rtl"
                    }`}
                  >
                    {/* Text side */}
                    <div
                      className={`space-y-3 ${
                        isEven
                          ? "md:text-right md:pr-12"
                          : "md:text-left md:pl-12 md:col-start-2 md:row-start-1"
                      }`}
                      style={{ direction: "ltr" }}
                    >
                      <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Image side */}
                    <div
                      className={`mt-4 md:mt-0 ${
                        isEven
                          ? "md:pl-12"
                          : "md:pr-12 md:col-start-1 md:row-start-1"
                      }`}
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-lg img-zoom">
                        <img
                          src={paintings[item.paintingIndex].image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="container px-4 mb-24">
        <ScrollReveal variant="blur-in">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              What Drives the Art
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Frame,
              title: "Authentic Artistry",
              desc: "Every piece is an original, hand-painted work of art, created with passion and meticulous attention to detail.",
            },
            {
              icon: Award,
              title: "Cultural Heritage",
              desc: "Celebrating India's rich artistic traditions while pushing the boundaries of contemporary expression.",
            },
            {
              icon: Heart,
              title: "Emotional Connection",
              desc: "Creating art that resonates with viewers on a deeply personal and emotional level.",
            },
          ].map((item, i) => (
            <StaggerItem key={item.title} index={i} variant="zoom-in">
              <div className="text-center p-8 bg-card rounded-2xl border border-border hover-lift transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4">
        <ScrollReveal variant="blur-in">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-10 md:p-14">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Explore the full ARTEZA collection or get in touch for commissions
              and inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/shop">
                  Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
