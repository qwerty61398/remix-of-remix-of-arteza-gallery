// Painting assets
import floralVase from "@/assets/paintings/floral-vase.jpg";
import autumnTree from "@/assets/paintings/autumn-tree.jpg";
import abstractBundle from "@/assets/paintings/abstract-bundle.jpg";
import dawnLake from "@/assets/paintings/dawn-lake.jpg";
import mountFuji from "@/assets/paintings/mount-fuji.jpg";
import fireDragon from "@/assets/paintings/fire-dragon.jpg";
import partnerEmbrace from "@/assets/paintings/partner-embrace.jpg";
import unityPortrait from "@/assets/paintings/unity-portrait.jpg";
import floralFace from "@/assets/paintings/floral-face.jpg";
import culturalMadhubani from "@/assets/paintings/cultural-madhubani.jpg";

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

export const paintings: Painting[] = [
  {
    id: "1",
    title: "Golden Bloom Symphony",
    image: floralVase,
    dimensions: "24\" × 36\"",
    price: 45000,
    description: "A vibrant still life featuring an elegant terracotta vase overflowing with hydrangeas, roses, and lilies against a warm golden backdrop. The painting captures the essence of celebration with wine glasses and cherries, creating a feast for the senses.",
    collection: "Nature's Palette",
    available: true
  },
  {
    id: "2",
    title: "Autumn's Embrace",
    image: autumnTree,
    dimensions: "20\" × 24\"",
    price: 35000,
    description: "A bold expressionist landscape featuring a majestic tree with fiery autumn foliage against a brilliant blue sky. The dynamic brushstrokes convey the energy and movement of nature in transition.",
    collection: "Nature's Palette",
    available: true
  },
  {
    id: "3",
    title: "Geometric Reverie",
    image: abstractBundle,
    dimensions: "36\" × 48\"",
    price: 65000,
    description: "A striking abstract composition blending organic forms with geometric precision. Bold colors dance across the canvas in a symphony of structure and spontaneity.",
    collection: "Abstract Expressions",
    available: true
  },
  {
    id: "4",
    title: "Lake at Dawn",
    image: dawnLake,
    dimensions: "30\" × 40\"",
    price: 55000,
    description: "A breathtaking landscape capturing the magical moment when first light kisses the mountain lake. The golden sunrise reflects off calm waters while wildflowers frame this serene scene.",
    collection: "Dreamscapes",
    available: true
  },
  {
    id: "5",
    title: "Sakura in Snow",
    image: mountFuji,
    dimensions: "24\" × 32\"",
    price: 48000,
    description: "A peaceful scene of traditional Japanese architecture beneath the majestic Mount Fuji. Cherry blossoms frame the composition while snow blankets the landscape in tranquil beauty.",
    collection: "Cultural Chronicles",
    available: true
  },
  {
    id: "6",
    title: "Phoenix Rising",
    image: fireDragon,
    dimensions: "36\" × 54\"",
    price: 75000,
    description: "An explosive abstract work featuring flowing flames of orange and red against a deep black void. The painting embodies the spirit of transformation and rebirth.",
    collection: "Abstract Expressions",
    available: true
  },
  {
    id: "7",
    title: "Eternal Bond",
    image: partnerEmbrace,
    dimensions: "30\" × 40\"",
    price: 58000,
    description: "An intimate portrayal of two souls intertwined, surrounded by vibrant abstract patterns and roses. The painting celebrates love, connection, and the beauty of human relationships.",
    collection: "Portraits and Personalities",
    available: true
  },
  {
    id: "8",
    title: "Crimson Dreams",
    image: unityPortrait,
    dimensions: "24\" × 36\"",
    price: 42000,
    description: "A sensual portrait of feminine grace and strength. Warm earth tones and expressive brushwork capture a moment of quiet contemplation and inner peace.",
    collection: "Portraits and Personalities",
    available: true
  },
  {
    id: "9",
    title: "Garden of Serenity",
    image: floralFace,
    dimensions: "30\" × 30\"",
    price: 52000,
    description: "A mesmerizing blend of portrait and floral elements. Delicate flowers and intricate lace-like patterns merge with serene feminine features in this dreamlike composition.",
    collection: "Dreamscapes",
    available: true
  },
  {
    id: "10",
    title: "Madhubani Heritage",
    image: culturalMadhubani,
    dimensions: "24\" × 36\"",
    price: 68000,
    description: "A stunning tribute to the traditional Madhubani art form of India. Rich colors and intricate patterns tell stories of mythology, nature, and daily life in this culturally significant piece.",
    collection: "Cultural Chronicles",
    available: true
  }
];

export const getCollectionBySlug = (slug: string) => {
  return collections.find(c => c.slug === slug);
};

export const getPaintingsByCollection = (collectionName: CollectionType) => {
  return paintings.filter(p => p.collection === collectionName);
};

export const getPaintingById = (id: string) => {
  return paintings.find(p => p.id === id);
};
