import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Track {
  name: string;
  artist: string;
  duration: string;
}

interface VinylPlayerProps {
  playlistName: string;
  tracks: Track[];
  spotifyUri?: string;
}

export default function VinylPlayer({ playlistName, tracks, spotifyUri }: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Vinyl Disk */}
      <div className="relative w-[250px] h-[250px] md:w-[280px] md:h-[280px]">
        {/* Vinyl record */}
        <div
          className={cn(
            "w-full h-full rounded-full relative",
            "vinyl-disk",
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

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] h-[36%] rounded-full bg-primary flex items-center justify-center p-2">
            <span className="text-primary-foreground text-[9px] md:text-[10px] font-medium text-center leading-tight line-clamp-3">
              {playlistName}
            </span>
          </div>

          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-background border border-border" />
        </div>

        {/* Play/Pause button overlay */}
        <button
          onClick={togglePlay}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
            "w-16 h-16 rounded-full flex items-center justify-center",
            "bg-background/60 backdrop-blur-sm border border-border/50",
            "hover:bg-background/80 transition-all duration-200",
            "hover:scale-110 active:scale-95"
          )}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-foreground" />
          ) : (
            <Play className="h-6 w-6 text-foreground ml-1" />
          )}
        </button>
      </div>

      {/* Spotify embed (hidden, ready for future URI) */}
      {spotifyUri && (
        <iframe
          className="hidden"
          src={`https://open.spotify.com/embed/playlist/${spotifyUri}?utm_source=generator&theme=0`}
          width="0"
          height="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist"
        />
      )}

      {/* Track list */}
      <div className="w-full max-w-md">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Track List</h3>
        <ScrollArea className="h-[200px] w-full rounded-lg border border-border bg-card p-1">
          <div className="space-y-0.5">
            {tracks.map((track, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                  "hover:bg-accent/50 transition-colors"
                )}
              >
                <span className="text-muted-foreground text-xs w-5 text-right shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate text-sm">{track.name}</p>
                  <p className="text-muted-foreground truncate text-xs">{track.artist}</p>
                </div>
                <span className="text-muted-foreground text-xs shrink-0">{track.duration}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
