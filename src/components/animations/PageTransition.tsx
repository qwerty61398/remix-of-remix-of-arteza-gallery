import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    // Small delay to ensure the DOM has updated
    const timeout = setTimeout(() => setIsVisible(true), 20);
    // Scroll to top on page change
    window.scrollTo({ top: 0 });
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "page-transition",
        isVisible && "page-transition--visible"
      )}
    >
      {children}
    </div>
  );
}
