import { Link, useLocation } from "react-router-dom";
import { Lightbulb } from "lucide-react";

export function StickyQuizButton() {
  const { pathname } = useLocation();
  const hidden = ["/quiz", "/checkout"].some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <Link
      to="/quiz"
      aria-label="Find Your Style — take the quiz"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-[0_8px_24px_hsl(258_89%_66%/0.35)] hover:shadow-[0_12px_32px_hsl(258_89%_66%/0.45)] hover:scale-105 transition-all animate-fade-in"
    >
      <Lightbulb className="h-4 w-4" />
      <span className="text-sm font-medium">Find Your Style</span>
    </Link>
  );
}
