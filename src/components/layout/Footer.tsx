import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="8" x2="12" y2="21" />
    <path d="M12 2a10 10 0 0 0-3.16 19.5c-.07-.63-.13-1.6.03-2.29l1.15-4.88s-.29-.58-.29-1.44c0-1.35.78-2.36 1.75-2.36.83 0 1.23.62 1.23 1.36 0 .83-.53 2.07-.8 3.22-.23.96.48 1.74 1.42 1.74 1.71 0 3.02-1.8 3.02-4.4 0-2.3-1.65-3.9-4.01-3.9-2.73 0-4.33 2.05-4.33 4.17 0 .83.32 1.71.71 2.19.08.1.09.18.07.28l-.27 1.06c-.04.17-.14.21-.33.13-1.24-.58-2.01-2.39-2.01-3.85 0-3.13 2.28-6.01 6.56-6.01 3.45 0 6.12 2.45 6.12 5.73 0 3.42-2.16 6.18-5.16 6.18-1.01 0-1.96-.52-2.28-1.14l-.62 2.37c-.22.87-.83 1.96-1.24 2.63A10 10 0 1 0 12 2z" />
  </svg>
);

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { name: "WhatsApp", icon: WhatsAppIcon, url: "https://wa.me/919711804497" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "Pinterest", icon: PinterestIcon, url: "https://pinterest.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-foreground">ARTEZA</span>
              <span className="text-xs text-muted-foreground italic">by Upasna</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Original paintings that capture emotion, culture, and the beauty of our world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shop</Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
              <Link to="/quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Art Style Quiz</Link>
              <Link to="/classes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Classes</Link>
            </nav>
          </div>

          {/* Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Information</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About the Artist</Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Artist Studio, Creative Lane<br />New Delhi, India</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ARTEZA by Upasna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
