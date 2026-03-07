import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const socialLinks = [{
  name: "Facebook",
  icon: Facebook,
  url: "https://facebook.com"
}, {
  name: "WhatsApp",
  icon: WhatsAppIcon,
  url: "https://wa.me/919711804497"
}, {
  name: "Instagram",
  icon: Instagram,
  url: "https://instagram.com"
}, {
  name: "Pinterest",
  icon: PinterestIcon,
  url: "https://pinterest.com"
}];
export default function ContactPage() {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon."
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  return <div className="py-12">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question about a painting? Interested in a commission? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+91 97118 04497</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-muted-foreground">hello@arteza.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Studio Address</h3>
                    <p className="text-muted-foreground">
                      Artist Studio, Creative Lane<br />
                      New Delhi, India 110001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <social.icon className="h-5 w-5" />
                  </a>)}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Your Name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                </div>
              </div>

              <Input placeholder="Subject" value={formData.subject} onChange={e => setFormData({
              ...formData,
              subject: e.target.value
            })} required />

              <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} required />

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>;
}