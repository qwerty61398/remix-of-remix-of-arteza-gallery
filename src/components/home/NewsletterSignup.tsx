import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    // TODO: Wire to a `newsletter_subscribers` table + edge function.
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Thanks! We'll be in touch.");
    setEmail("");
    setSubmitting(false);
  };

  return (
    <section className="py-20">
      <div className="container px-4">
        <ScrollReveal variant="zoom-in">
          <div className="max-w-2xl mx-auto text-center bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              Join the studio newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Be first to see new paintings, collections, and stories from the studio.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                aria-label="Email address"
              />
              <Button type="submit" disabled={submitting} className="btn-press">
                {submitting ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
