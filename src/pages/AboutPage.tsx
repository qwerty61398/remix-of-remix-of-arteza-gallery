import { Frame, Award, Heart } from "lucide-react";
import { paintings } from "@/data/paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container px-4">
        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal variant="fade-left">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                About the Artist
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Upasna is a contemporary artist whose work bridges the gap between
                traditional Indian art forms and modern expressionism. Born with an
                innate love for colors and forms, she has dedicated her life to
                creating art that speaks to the soul.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each painting in the ARTEZA collection is a labor of love,
                meticulously crafted to evoke emotion and spark conversation.
                From the intricate patterns of Madhubani to the bold strokes
                of abstract expressionism, Upasna's versatility knows no bounds.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right">
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted img-zoom">
                <img
                  src={paintings[8].image}
                  alt="Upasna's Art"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-lg overflow-hidden shadow-xl border-4 border-background img-zoom">
                <img
                  src={paintings[6].image}
                  alt="Artwork detail"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Palette, title: "Authentic Artistry", desc: "Every piece is an original, hand-painted work of art, created with passion and attention to detail." },
            { icon: Award, title: "Cultural Heritage", desc: "Celebrating India's rich artistic traditions while pushing the boundaries of contemporary expression." },
            { icon: Heart, title: "Emotional Connection", desc: "Creating art that resonates with viewers on a deeply personal and emotional level." },
          ].map((item, i) => (
            <StaggerItem key={item.title} index={i} variant="zoom-in">
              <div className="text-center p-8 bg-card rounded-xl border border-border hover-lift">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>

        {/* Journey */}
        <ScrollReveal variant="blur-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              The Artistic Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From early childhood sketches to commissioned works for collectors
              around the world, Upasna's journey has been one of constant evolution.
              Trained in traditional Indian art forms, she later explored Western
              techniques, blending the best of both worlds into her unique style.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, her work is recognized for its vibrant colors, emotional depth,
              and the ability to tell stories that transcend cultural boundaries.
              Each painting is not just a visual experience but a journey into
              the artist's soul.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
