export type CollectionType = 
  | "Abstract Expressions"
  | "Cultural Chronicles"
  | "Dreamscapes"
  | "Nature's Palette"
  | "Portraits and Personalities";

export interface Painting {
  id: string;
  title: string;
  image: string;
  dimensions: string;
  price: number;
  description: string;
  collection: CollectionType;
  available: boolean;
  medium: string;
  material: string;
}

export const collections: { name: CollectionType; description: string; slug: string }[] = [
  {
    name: "Abstract Expressions",
    description: "Bold colors and dynamic forms that evoke emotion beyond representation",
    slug: "abstract-expressions"
  },
  {
    name: "Cultural Chronicles",
    description: "Celebrating heritage and tradition through vibrant artistic narratives",
    slug: "cultural-chronicles"
  },
  {
    name: "Dreamscapes",
    description: "Surreal and imaginative worlds that blur the line between reality and fantasy",
    slug: "dreamscapes"
  },
  {
    name: "Nature's Palette",
    description: "Capturing the breathtaking beauty of landscapes and natural elements",
    slug: "natures-palette"
  },
  {
    name: "Portraits and Personalities",
    description: "Intimate explorations of the human form and spirit",
    slug: "portraits-and-personalities"
  }
];

export const getCollectionBySlug = (slug: string) => {
  return collections.find(c => c.slug === slug);
};
