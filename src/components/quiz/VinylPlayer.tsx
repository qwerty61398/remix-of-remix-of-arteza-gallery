import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VinylPlayerProps {
  playlistName: string;
  spotifyUri?: string;
  coverImage?: string;
}

export default function VinylPlayer({ playlistName, spotifyUri, coverImage }: VinylPlayerProps) {
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

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Vinyl + Tonearm container */}
      <div className="relative w-[250px] h-[240px] md:w-[300px] md:h-[280px]">
        {/* Tonearm */}
        <div
          className="tonearm tonearm--playing absolute top-0 right-[50px] md:right-[60px] z-20"
          style={{
            transformOrigin: "top center",
            width: "4px",
            height: "120px",
          }}
        >
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-zinc-400 border-2 border-zinc-300" />
          <div className="absolute top-3 left-0 w-1 h-[85px] bg-zinc-400 rounded-full" />
          <div className="absolute bottom-0 -left-1 w-2.5 h-5 bg-zinc-400 rounded-b-sm" />
          <div className="absolute -bottom-1.5 left-0 w-0.5 h-2 bg-zinc-300 rounded-full mx-auto" style={{ marginLeft: '2px' }} />
        </div>

        {/* Vinyl record — always spinning */}
        <div className="absolute bottom-0 left-0">
          <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
            {/* Glow effect */}
            <div className="absolute inset-[-12px] rounded-full opacity-100 vinyl-glow pointer-events-none" />

            <div
              className="w-full h-full rounded-full relative vinyl-disk vinyl-spinning overflow-hidden"
              style={{
                boxShadow: "0 4px 30px hsl(0 0% 0% / 0.4), inset 0 0 20px hsl(0 0% 0% / 0.3)",
              }}
            >
              {/* Marble-textured base from the cover image (blurred & desaturated for a stone-like feel) */}
              {coverImage ? (
                <img
                  src={coverImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "blur(8px) contrast(1.1) saturate(0.7) brightness(0.55)", transform: "scale(1.15)" }}
                />
              ) : (
                <div className="absolute inset-0 bg-[hsl(0_0%_10%)]" />
              )}

              {/* Groove rings overlay — transparent so the marble cover shows through */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `repeating-radial-gradient(circle at center,
                    hsl(0 0% 0% / 0.55) 0px,
                    hsl(0 0% 0% / 0.55) 1px,
                    hsl(0 0% 100% / 0.04) 1px,
                    hsl(0 0% 100% / 0.04) 3px)`,
                  maskImage: "radial-gradient(circle at center, transparent 0%, transparent 26%, black 27%, black 100%)",
                  WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, transparent 26%, black 27%, black 100%)",
                }}
              />

              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, hsl(0 0% 100% / 0.10) 0%, transparent 50%, hsl(0 0% 0% / 0.18) 100%)",
                }}
              />

              {/* Center label — larger cover image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] h-[52%] rounded-full overflow-hidden bg-primary flex items-center justify-center ring-2 ring-black/40">
                {coverImage ? (
                  <img src={coverImage} alt={playlistName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary" />
                )}
              </div>

              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-background border border-border z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Spotify embed — responsive via aspect ratio so the play button scales correctly */}
      {spotifyUri && (
        <div className="w-full max-w-[420px]" style={{ aspectRatio: "420 / 152" }}>
          <iframe
            ref={iframeRef}
            className="rounded-xl w-full h-full"
            src={iframeSrc}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify playlist"
          />
        </div>
      )}
    </div>
  );
}
