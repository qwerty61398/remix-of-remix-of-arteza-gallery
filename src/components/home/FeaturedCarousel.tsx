import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Painting } from "@/data/paintings";

interface FeaturedCarouselProps {
  paintings: Painting[];
}

export function FeaturedCarousel({ paintings }: FeaturedCarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (!paintings.length) return null;

  return (
    <Carousel
      opts={{ loop: true, align: "start" }}
      plugins={[autoplay.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {paintings.map((p) => (
          <CarouselItem
            key={p.id}
            className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
          >
            <ArtworkCard painting={p} variant="compact" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4" />
      <CarouselNext className="hidden md:flex -right-4" />
    </Carousel>
  );
}
