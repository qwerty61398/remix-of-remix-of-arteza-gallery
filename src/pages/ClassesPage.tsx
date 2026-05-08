import { useState } from "react";
import {
  Calendar,
  Clock,
  IndianRupee,
  Users,
  Mail,
  Info,
  Palette,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePaintings } from "@/hooks/use-paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

interface ArtClass {
  id: string;
  funTitle: string;
  classLabel: string;
  description: string;
  image: string;
  price: string;
  age: string;
  duration: string;
  schedule: string;
  materials: string[];
  curriculum: string[];
}

const ARTIST_EMAIL = "hello@upasnaarts.com";

export default function ClassesPage() {
  const { data: paintings = [] } = usePaintings();
  const [detailsOpen, setDetailsOpen] = useState<ArtClass | null>(null);
  const [emailFor, setEmailFor] = useState<ArtClass | null>(null);
  const [email, setEmail] = useState("");

  const classes: ArtClass[] = [
    {
      id: "c1",
      classLabel: "Class I",
      funTitle: "Little Picassos",
      description:
        "A playful introduction to art for our youngest creators — full of colour, imagination, and joy.",
      image: paintings[0]?.image || "",
      price: "₹1,500 / month",
      age: "Ages 5 – 10",
      duration: "1 hour",
      schedule: "Tue & Thu, 5:00 – 6:00 PM",
      materials: ["Color pencils", "Oil pastels"],
      curriculum: ["Sketching", "Coloring", "Color Mixing", "Patterns"],
    },
    {
      id: "c2",
      classLabel: "Class II",
      funTitle: "Young Visionaries",
      description:
        "Confident strokes and bold ideas — building real technique while keeping creativity wild.",
      image: paintings[1]?.image || "",
      price: "₹2,000 / month",
      age: "Ages 10 – 15",
      duration: "1 hour 30 minutes",
      schedule: "Tue & Thu, 6:00 – 7:30 PM",
      materials: ["Color pencils", "Water Color Paint"],
      curriculum: [
        "Sketching",
        "Theme Coloring",
        "Color Shading",
        "Pattern Making",
        "Design Idea / Development",
      ],
    },
    {
      id: "c3",
      classLabel: "Class III",
      funTitle: "The Studio Collective",
      description:
        "A serious studio practice for older students — explore mediums, theory, and personal voice.",
      image: paintings[2]?.image || "",
      price: "₹2,500 / month",
      age: "Ages 15+",
      duration: "1 hour 30 minutes",
      schedule: "Sat & Sun, 12:00 – 1:30 PM",
      materials: ["Watercolor paint", "Acrylic paint", "Oil paint"],
      curriculum: [
        "Traditional Art",
        "Abstract Art",
        "Expressionism",
        "Design Idea",
        "Color Theory",
        "Pattern Making",
      ],
    },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailFor) return;
    const subject = encodeURIComponent(
      `Calendar invite request — ${emailFor.classLabel} (${emailFor.funTitle})`
    );
    const body = encodeURIComponent(
      `Hi,\n\nI've paid for ${emailFor.classLabel} — ${emailFor.funTitle}.\nPlease send the Google Calendar invite to: ${email}\n\nSchedule: ${emailFor.schedule}\n\nThank you!`
    );
    window.location.href = `mailto:${ARTIST_EMAIL}?subject=${subject}&body=${body}`;
    setEmailFor(null);
    setEmail("");
  };

  return (
    <div className="py-12">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Art Classes & Workshops
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn directly from the artist. Whether you're a beginner or looking to
              refine your skills, there's a class for everyone.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {classes.map((c, i) => (
            <StaggerItem key={c.id} index={i}>
              <article className="grid grid-cols-10 gap-5 bg-card border border-border rounded-xl overflow-hidden hover-lift">
                <div className="col-span-10 sm:col-span-3 aspect-[4/3] sm:aspect-auto overflow-hidden bg-muted">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.funTitle}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="col-span-10 sm:col-span-7 p-5 sm:p-6 flex flex-col">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {c.classLabel}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-1">
                    {c.funTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.description}</p>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <MetaItem icon={<IndianRupee className="h-4 w-4" />} label={c.price} />
                    <MetaItem icon={<Users className="h-4 w-4" />} label={c.age} />
                    <MetaItem icon={<Clock className="h-4 w-4" />} label={c.duration} />
                    <MetaItem icon={<Calendar className="h-4 w-4" />} label={c.schedule} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 btn-press"
                      onClick={() => setDetailsOpen(c)}
                    >
                      <Info className="h-4 w-4" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 btn-press"
                      onClick={() => setEmailFor(c)}
                    >
                      <Mail className="h-4 w-4" />
                      Get Calendar Invite
                    </Button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>

        <ScrollReveal variant="zoom-in">
          <div className="mt-16 bg-primary/5 rounded-xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Private Sessions Available
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking for personalized instruction? Book a private session for one-on-one
              guidance tailored to your specific goals and skill level.
            </p>
            <Button size="lg" className="btn-press">
              Contact for Private Sessions
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Details dialog */}
      <Dialog open={!!detailsOpen} onOpenChange={(v) => !v && setDetailsOpen(null)}>
        <DialogContent className="max-w-lg">
          {detailsOpen && (
            <>
              <DialogHeader>
                <span className="text-xs font-medium text-primary uppercase tracking-wide text-left">
                  {detailsOpen.classLabel}
                </span>
                <DialogTitle className="font-serif text-2xl text-left">
                  {detailsOpen.funTitle}
                </DialogTitle>
                <DialogDescription className="text-left">
                  Everything you need to know before joining this class.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Materials needed
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {detailsOpen.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    What you'll learn
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {detailsOpen.curriculum.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Email dialog */}
      <Dialog open={!!emailFor} onOpenChange={(v) => !v && (setEmailFor(null), setEmail(""))}>
        <DialogContent className="max-w-md">
          {emailFor && (
            <form onSubmit={handleEmailSubmit}>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-left">
                  Get a Google Calendar invite
                </DialogTitle>
                <DialogDescription className="text-left">
                  Once your payment is complete, share your email and we'll send a calendar
                  invite for {emailFor.classLabel} — {emailFor.funTitle}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 mt-4">
                <Label htmlFor="rsvp-email">Your email</Label>
                <Input
                  id="rsvp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  maxLength={255}
                />
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" className="gap-2 btn-press">
                  <Mail className="h-4 w-4" />
                  Send Request
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}
