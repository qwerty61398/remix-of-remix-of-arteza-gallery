import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
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
