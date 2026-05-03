import { Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Painting } from "@/data/paintings";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface InstagramFeedProps {
  paintings: Painting[];
  handle?: string;
  url?: string;
}

// TODO: Replace placeholder painting thumbnails with real Instagram media
// once an Instagram Basic Display / Graph API integration is wired in.
export function InstagramFeed({
  paintings,
  handle = "upasna_art",
  url = "https://instagram.com",
}: InstagramFeedProps) {
  const tiles = paintings.slice(0, 6);

  return (
    <section className="py-20 bg-card">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary mb-3">
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide uppercase">
                From the studio
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Follow @{handle} on Instagram
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Behind-the-scenes glimpses, work in progress, and new releases.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {tiles.map((p) => (
            <a
              key={p.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md bg-muted"
              aria-label={`View on Instagram: ${p.title}`}
            >
              <ImageWithSkeleton
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <Instagram className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 btn-press">
              <Instagram className="h-4 w-4" />
              View on Instagram
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
