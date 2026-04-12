import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VinylPlayerProps {
  playlistName: string;
  spotifyUri?: string;
  coverImage?: string;
}

export default function VinylPlayer({ playlistName, spotifyUri, coverImage }: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const playlistId = spotifyUri;

  useEffect(() => {
    if (playlistId) {
      setIframeSrc(
        `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`
      );
    }
  }, [playlistId]);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);

    if (playlistId) {
      // Reload iframe with autoplay toggled
      setIframeSrc(
        `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0${next ? "&autoplay=1" : ""}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Vinyl + Tonearm container */}
      <div className="relative w-[250px] h-[240px] md:w-[300px] md:h-[280px]">
        {/* Tonearm */}
        <div
          className={cn(
            "tonearm absolute top-0 right-[50px] md:right-[60px] z-20",
            isPlaying && "tonearm--playing"
          )}
          style={{
            transformOrigin: "top center",
            width: "4px",
            height: "120px",
          }}
        >
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-muted-foreground border-2 border-border" />
          <div className="absolute top-3 left-0 w-1 h-[85px] bg-muted-foreground rounded-full" />
          <div className="absolute bottom-0 -left-1 w-2.5 h-5 bg-muted-foreground rounded-b-sm" />
          <div className="absolute -bottom-1.5 left-0 w-0.5 h-2 bg-foreground rounded-full mx-auto" style={{ marginLeft: '2px' }} />
        </div>

        {/* Vinyl record */}
        <div className="absolute bottom-0 left-0">
          <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
            {/* Glow effect */}
            <div
              className={cn(
                "absolute inset-[-12px] rounded-full transition-opacity duration-500 pointer-events-none",
                isPlaying ? "opacity-100 vinyl-glow" : "opacity-0"
              )}
            />

            <div
              className={cn(
                "w-full h-full rounded-full relative vinyl-disk",
                isPlaying && "vinyl-spinning"
              )}
              style={{
                background: `
                  radial-gradient(circle at center, 
                    hsl(var(--primary)) 0%, 
                    hsl(var(--primary)) 18%, 
                    hsl(var(--primary) / 0.8) 18.5%, 
                    hsl(0 0% 8%) 19%, 
                    hsl(0 0% 12%) 20%, 
                    hsl(0 0% 8%) 21%, 
                    hsl(0 0% 12%) 24%, 
                    hsl(0 0% 8%) 25%, 
                    hsl(0 0% 12%) 28%, 
                    hsl(0 0% 8%) 29%, 
                    hsl(0 0% 12%) 32%, 
                    hsl(0 0% 8%) 33%, 
                    hsl(0 0% 12%) 36%, 
                    hsl(0 0% 8%) 37%, 
                    hsl(0 0% 12%) 40%, 
                    hsl(0 0% 8%) 41%, 
                    hsl(0 0% 12%) 44%, 
                    hsl(0 0% 8%) 45%, 
                    hsl(0 0% 12%) 48%, 
                    hsl(0 0% 8%) 49%, 
                    hsl(0 0% 10%) 50%, 
                    hsl(0 0% 8%) 90%, 
                    hsl(0 0% 5%) 100%
                  )
                `,
                boxShadow: "0 4px 30px hsl(0 0% 0% / 0.4), inset 0 0 20px hsl(0 0% 0% / 0.3)",
              }}
            >
              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, transparent 50%, hsl(0 0% 0% / 0.1) 100%)",
                }}
              />

              {/* Center label — cover image or plain */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] h-[36%] rounded-full overflow-hidden bg-primary flex items-center justify-center">
                {coverImage ? (
                  <img src={coverImage} alt={playlistName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary" />
                )}
              </div>

              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-background border border-border" />
            </div>

            {/* Play/Pause button overlay */}
            <button
              onClick={togglePlay}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-background/60 backdrop-blur-sm border border-border/50",
                "hover:bg-background/80 transition-all duration-200",
                "hover:scale-110 active:scale-95"
              )}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-foreground" />
              ) : (
                <Play className="h-5 w-5 text-foreground ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spotify embed — visible and interactable */}
      {spotifyUri && (
        <iframe
          ref={iframeRef}
          className="rounded-xl w-full"
          style={{ maxWidth: "300px", height: "152px" }}
          src={iframeSrc}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist"
        />
      )}
    </div>
  );
}
