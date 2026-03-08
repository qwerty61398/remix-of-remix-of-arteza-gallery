import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
}

export function ImageWithSkeleton({
  className,
  aspectRatio,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <Skeleton
          className={cn("absolute inset-0 w-full h-full rounded-lg", className)}
          style={aspectRatio ? { aspectRatio } : undefined}
        />
      )}
      <img
        {...props}
        alt={alt}
        className={cn(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
