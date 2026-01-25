import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="container px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="font-serif text-9xl font-bold text-primary/20 mb-4">
            404
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for seems to have wandered off 
            like a brushstroke on an empty canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Search className="h-4 w-4" />
                Browse Art
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
