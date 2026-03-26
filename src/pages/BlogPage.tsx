import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePaintings } from "@/hooks/use-paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

export default function BlogPage() {
  const { data: paintings = [] } = usePaintings();

  const blogPosts = [
    {
      id: "1",
      title: "The Story Behind Madhubani: A Cultural Journey",
      excerpt: "Exploring the ancient art form that has been passed down through generations in Bihar, India.",
      image: paintings[9]?.image || "",
      date: "January 15, 2026",
      readTime: "5 min read",
      category: "Art History",
    },
    {
      id: "2",
      title: "Finding Inspiration in Nature's Palette",
      excerpt: "How the changing seasons and natural landscapes influence my landscape paintings.",
      image: paintings[3]?.image || "",
      date: "January 10, 2026",
      readTime: "4 min read",
      category: "Inspiration",
    },
    {
      id: "3",
      title: "Abstract Art: Emotion Beyond Form",
      excerpt: "Understanding the power of abstract expressionism and how it connects with viewers.",
      image: paintings[5]?.image || "",
      date: "January 5, 2026",
      readTime: "6 min read",
      category: "Technique",
    },
  ];

  return (
    <div className="py-12">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Artist's Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, inspirations, and stories from behind the canvas.
              Join me on my artistic journey.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Post */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="mb-16">
            <Link to="#" className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted img-zoom">
                  {blogPosts[0].image && (
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <span className="text-sm font-medium text-primary">{blogPosts[0].category}</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </ScrollReveal>

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, i) => (
            <StaggerItem key={post.id} index={i}>
              <Link to="#" className="group block">
                <article className="space-y-4">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted img-zoom">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </div>
    </div>
  );
}
