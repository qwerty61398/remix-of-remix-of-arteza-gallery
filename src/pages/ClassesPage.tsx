import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paintings } from "@/data/paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

const classes = [
  {
    id: "1",
    title: "Introduction to Madhubani Art",
    description: "Learn the traditional Madhubani painting techniques passed down through generations. Perfect for beginners.",
    image: paintings[9].image,
    duration: "3 hours",
    participants: "8-12 students",
    date: "Every Saturday",
    price: 2500,
  },
  {
    id: "2",
    title: "Abstract Expressionism Workshop",
    description: "Explore the freedom of abstract art. Learn to express emotions through bold colors and dynamic forms.",
    image: paintings[2].image,
    duration: "4 hours",
    participants: "6-10 students",
    date: "First Sunday of month",
    price: 3500,
  },
  {
    id: "3",
    title: "Landscape Painting Masterclass",
    description: "Capture the beauty of nature on canvas. From sunrise to sunset, learn to paint breathtaking landscapes.",
    image: paintings[3].image,
    duration: "5 hours",
    participants: "6-8 students",
    date: "Second Sunday of month",
    price: 4000,
  },
];

export default function ClassesPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, i) => (
            <StaggerItem key={classItem.id} index={i}>
              <article className="bg-card border border-border rounded-xl overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden img-zoom">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {classItem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{classItem.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {classItem.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {classItem.participants}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                      <Calendar className="h-4 w-4" />
                      {classItem.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-semibold text-foreground">
                      {formatPrice(classItem.price)}
                    </span>
                    <Button size="sm" className="gap-1 btn-press">
                      Book Now
                      <ArrowRight className="h-4 w-4" />
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
            <Button size="lg" className="btn-press">Contact for Private Sessions</Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
