import { useState } from "react";
import { ArrowRight, BookOpen, Clock, Calendar, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePaintings } from "@/hooks/use-paintings";
import { ScrollReveal, StaggerItem } from "@/components/animations/ScrollReveal";

interface Book {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  amazonUrl: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogPage() {
  const { data: paintings = [] } = usePaintings();
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  const books: Book[] = [
    {
      id: "b1",
      title: "Untitled Book One",
      description: "A heartfelt journey through colour, culture, and the quiet stories that brushes leave behind on canvas.",
      price: "₹499",
      image: paintings[0]?.image || "",
      amazonUrl: "#",
    },
    {
      id: "b2",
      title: "Untitled Book Two",
      description: "An illustrated companion to the artist's process — sketches, rituals, and reflections from the studio.",
      price: "₹699",
      image: paintings[1]?.image || "",
      amazonUrl: "#",
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Story Behind Madhubani: A Cultural Journey",
      excerpt: "Exploring the ancient art form that has been passed down through generations in Bihar, India.",
      body: "Madhubani painting is one of India's most cherished folk art traditions, originating in the Mithila region of Bihar. For centuries, the women of these villages have transformed mud walls and handmade paper into vivid storybooks — depicting gods, goddesses, weddings, and the rhythms of daily life. In this post I share what drew me to the form, the natural pigments I love working with, and how I bring its motifs into my contemporary practice.",
      image: paintings[9]?.image || "",
      date: "January 15, 2026",
      readTime: "5 min read",
      category: "Art History",
    },
    {
      id: "2",
      title: "Finding Inspiration in Nature's Palette",
      excerpt: "How the changing seasons and natural landscapes influence my landscape paintings.",
      body: "Every walk outside is a quiet conversation with colour. The first wash of monsoon green, the bruised violet of an evening sky, the warm ochre of dry grass — these become the building blocks of every landscape I paint. Here's how I capture and translate these fleeting moments into work that hopefully feels alive on the wall.",
      image: paintings[3]?.image || "",
      date: "January 10, 2026",
      readTime: "4 min read",
      category: "Inspiration",
    },
    {
      id: "3",
      title: "Abstract Art: Emotion Beyond Form",
      excerpt: "Understanding the power of abstract expressionism and how it connects with viewers.",
      body: "Abstract art asks both the maker and the viewer to slow down. Without recognisable subjects, we are left with rhythm, contrast, and feeling. In this post I walk through how I begin an abstract piece, the role intuition plays, and why I think these works often say more than realism ever could.",
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

        {/* Books */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Books by the Artist
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="bg-card border border-border rounded-xl p-5 flex gap-5 hover-lift"
                >
                  <div className="w-28 sm:w-36 flex-shrink-0 aspect-[3/4] rounded-md overflow-hidden bg-muted">
                    {book.image && (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground">
                      {book.title}
                    </h3>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <p className="text-sm text-muted-foreground flex-1">
                        {book.description}
                      </p>
                      <span className="font-semibold text-foreground whitespace-nowrap">
                        {book.price}
                      </span>
                    </div>
                    <div className="mt-auto pt-4">
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="gap-2 btn-press">
                          <ShoppingCart className="h-4 w-4" />
                          Buy on Amazon
                        </Button>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Posts (30:70) */}
        <div className="space-y-6 mb-16">
          {blogPosts.map((post, i) => (
            <StaggerItem key={post.id} index={i}>
              <article className="grid grid-cols-10 gap-5 bg-card border border-border rounded-xl overflow-hidden hover-lift">
                <div className="col-span-10 sm:col-span-3 aspect-[4/3] sm:aspect-auto overflow-hidden bg-muted">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="col-span-10 sm:col-span-7 p-5 sm:p-6 flex flex-col">
                  <span className="text-xs font-medium text-primary">{post.category}</span>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-1">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 btn-press"
                      onClick={() => setOpenPost(post)}
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>

        {/* Coming soon */}
        <ScrollReveal variant="zoom-in">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center">
            <Sparkles className="h-6 w-6 text-primary mx-auto mb-3" />
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-2">
              More stories coming soon
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              New posts from the studio are on the way. Check back soon for fresh writings on art,
              process, and inspiration.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <Dialog open={!!openPost} onOpenChange={(v) => !v && setOpenPost(null)}>
        <DialogContent className="max-w-2xl">
          {openPost && (
            <>
              <DialogHeader>
                <span className="text-xs font-medium text-primary text-left">
                  {openPost.category}
                </span>
                <DialogTitle className="font-serif text-2xl text-left">
                  {openPost.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-xs text-left">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {openPost.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {openPost.readTime}
                  </span>
                </DialogDescription>
              </DialogHeader>
              {openPost.image && (
                <div className="aspect-[16/9] rounded-md overflow-hidden bg-muted">
                  <img
                    src={openPost.image}
                    alt={openPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {openPost.body}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
