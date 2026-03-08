import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const socialLinks = [
  { name: "Facebook", icon: ({ className }: { className?: string }) => <Facebook className={className} />, url: "https://facebook.com" },
  { name: "WhatsApp", icon: ({ className }: { className?: string }) => <FaWhatsapp className={className} />, url: "https://wa.me/919711804497" },
  { name: "Instagram", icon: ({ className }: { className?: string }) => <Instagram className={className} />, url: "https://instagram.com" },
  { name: "Pinterest", icon: ({ className }: { className?: string }) => <FaPinterestP className={className} />, url: "https://pinterest.com" },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-12">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question about a painting? Interested in a commission?
              We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ScrollReveal variant="fade-left">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 97118 04497" },
                    { icon: Mail, label: "Email", value: "hello@arteza.com" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.label}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
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
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover-lift transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus-ring-animated"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus-ring-animated"
                    required
                  />
                </div>
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="focus-ring-animated"
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="focus-ring-animated"
                  required
                />
                <Button type="submit" className="w-full gap-2 btn-press">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
