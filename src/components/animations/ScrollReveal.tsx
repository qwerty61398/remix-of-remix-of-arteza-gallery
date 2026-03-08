import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "blur-in";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ once });

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", `scroll-reveal--${variant}`, isVisible && "scroll-reveal--visible", className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// For staggered grid/list items
interface StaggerRevealProps {
  children: ReactNode;
  index: number;
  baseDelay?: number;
  variant?: AnimationVariant;
  className?: string;
}

export function StaggerItem({
  children,
  index,
  baseDelay = 80,
  variant = "fade-up",
  className,
}: StaggerRevealProps) {
  return (
    <ScrollReveal variant={variant} delay={index * baseDelay} className={className}>
      {children}
    </ScrollReveal>
  );
}
