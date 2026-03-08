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
import ajantaDancer from "@/assets/paintings/ajanta-dancer.jpg";
import palePortrait from "@/assets/paintings/pale-portrait.jpg";

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

export const paintings: Painting[] = [
  {
    id: "1",
    title: "Amber Harvest: Floral Libation",
    image: floralVase,
    dimensions: "24\" × 36\"",
    price: 23000,
    description: "This luminous still life acrylic painting captures a bountiful bouquet spilling from a gleaming bronze vase, alive with the symphony of blooms—delicate pink and white roses, ethereal white lilies, vibrant purple alliums, and lush blue hydrangeas intertwined with verdant leaves, their petals unfurling in joyful abundance. Below, twin crystal goblets brim with ruby-red wine, their stems casting elegant shadows, while a scattering of glossy cherries adds a pop of crimson temptation on the sun-kissed ochre ground. Signed \"Upasna 24\" in the corner, this canvas radiates warmth and indulgence, blending the opulence of nature's palette with subtle hints of revelry—evoking intimate evenings and the sweet nectar of life's fleeting pleasures. A timeless piece for lovers of classical still life infused with modern vibrancy.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "2",
    title: "Lingering Embrace: Follower in Bloom",
    image: partnerEmbrace,
    dimensions: "24\" × 36\"",
    price: 30000,
    description: "In this vibrant abstract oil painting, two intimate nude figures—a graceful woman with her hair elegantly pinned in a bun and a tender man with tousled locks—share a profound, back-to-back embrace that speaks to the quiet poetry of connection. Their warm, ochre-toned skin contrasts against a kaleidoscope of patchwork colors: swirling blues, lush greens, soft pinks, and sunny yellows that evoke a dreamlike mosaic of emotions. Surrounding them, lush pink and crimson roses unfurl like symbols of passion and fragility, while intricate orange gears and mechanical motifs emerge from the edges, hinting at the tension between organic desire and the relentless churn of time.",
    collection: "Portraits and Personalities",
    available: true,
    medium: "Mixed Media",
    material: "Canvas"
  },
  {
    id: "3",
    title: "Fractured Verdure: Geometric Reverie",
    image: abstractBundle,
    dimensions: "24\" × 36\"",
    price: 23500,
    description: "This dynamic geometric abstract oil painting reimagines form through a bold interplay of interlocking shapes and vivid hues, where earthy brown curves coil like ancient roots against a serene blue expanse, framed by crisp green squares that pulse with vitality. Sunny yellow bursts crown the composition, bleeding into fiery red and rust accents that drip with impulsive energy, while subtle grids of navy and teal weave a tapestry of tension and harmony. Evocative of cubist fragmentation meets modernist exuberance, the layered brushwork creates a rhythmic depth—inviting contemplation of nature's resilience amid urban dissection.",
    collection: "Abstract Expressions",
    available: true,
    medium: "Mixed Media",
    material: "Canvas"
  },
  {
    id: "4",
    title: "Harmony of Seasons",
    image: mountFuji,
    dimensions: "24\" × 36\"",
    price: 18000,
    description: "A striking original oil painting depicting a dramatic mountain peak blanketed in snow, framed by vivid autumn trees dusted with frost. Nestled in the valley are traditional-style buildings with glowing windows, surrounded by snow-covered paths and stone walls. This piece blends seasonal contrasts and architectural charm, offering a tranquil yet powerful visual experience perfect for home or office decor.",
    collection: "Nature's Palette",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "5",
    title: "Azure Veil: Blossom Reverie",
    image: floralFace,
    dimensions: "36\" × 36\"",
    price: 25000,
    description: "In this enchanting oil portrait, a poised woman's face emerges in tranquil repose, her eyes gently closed beneath lush lashes, evoking a dreamlike introspection. Her full red lips curve with subtle allure, while one cheek cascades with delicate blue filigree vines, like whispered secrets etched in sapphire. Encircling her, pristine white dahlias unfurl their petals with warm bronze hearts, their slender stems weaving through ochre leaves against a profound cobalt blue ground, hinting at hidden archways and ethereal depths. This canvas marries floral symbolism with ornate elegance.",
    collection: "Dreamscapes",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "6",
    title: "Ganesha: Madhubani Vision of Divine Joy",
    image: culturalMadhubani,
    dimensions: "24\" × 36\"",
    price: 35000,
    description: "Hand-painted in authentic Madhubani (Mithila) style, this artwork features Lord Ganesha seated gracefully with his loyal mouse beside him, surrounded by ornate floral patterns and symbolic motifs. Made using natural colors on handmade paper, it's a beautiful representation of India's living folk art tradition — ideal as a spiritual gift, home decor, or collector's item celebrating Hindu mythology and cultural heritage.",
    collection: "Cultural Chronicles",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "7",
    title: "Inferno's Whisper: Flames in Eclipse",
    image: fireDragon,
    dimensions: "24\" × 36\"",
    price: 28000,
    description: "This explosive abstract oil painting ignites the canvas with a torrent of fiery oranges, molten reds, and flickering golds that cascade upward like a phoenix's rebirth. Against a deep black void, the flames dance with raw energy and primal force, evoking the spirit of transformation and the beauty found in destruction's embrace.",
    collection: "Abstract Expressions",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "8",
    title: "Sapphire Bloom: Crimson Canopy",
    image: autumnTree,
    dimensions: "24\" × 18\"",
    price: 9500,
    description: "This evocative landscape acrylic painting unfolds a surreal spring vista under a vast cerulean sky, where a majestic blue-trunked tree bursts into a crown of vivid crimson and pink blossoms, their petals dancing like flames against the azure expanse. Flanking it, a forest of emerald pines rises in rhythmic silhouettes, their tips kissed by subtle reds, while a turquoise meadow sweeps below, edged in golden yellows and fiery scarlets that evoke the earth's awakening pulse. Rippling blue waters at the base mirror the ethereal harmony, blending dreamlike abstraction with nature's raw poetry.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "9",
    title: "Silent Dawn Over the Blue Mountains",
    image: dawnLake,
    dimensions: "24\" × 36\"",
    price: 18000,
    description: "In this expressive acrylic work, dawn unfolds in a symphony of color — fiery gold spills across the horizon, igniting the clouds and setting the lake ablaze with reflected light. Dark, majestic mountains stand as silent sentinels, while the foreground blooms with wildflowers and whispering reeds. It's not just a sunrise; it's an emotional experience — a moment of awe, renewal, and quiet joy painted with bold strokes and luminous hues.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "10",
    title: "Whisper of the Ajanta: Grace in Stone and Color",
    image: ajantaDancer,
    dimensions: "24\" × 36\"",
    price: 20000,
    description: "Inspired by the iconic figures of Ajanta, this artwork portrays a dancer radiating quiet contemplation and poised beauty. The composition emphasizes flowing lines, detailed ornamentation, and a warm, earthy palette that evokes the ancient murals. It's an intimate homage to the skill and spiritual depth captured in India's most celebrated cave paintings.",
    collection: "Cultural Chronicles",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "11",
    title: "Crimson Dreams",
    image: unityPortrait,
    dimensions: "24\" × 36\"",
    price: 42000,
    description: "A sensual portrait of feminine grace and strength. Warm earth tones and expressive brushwork capture a moment of quiet contemplation and inner peace.",
    collection: "Portraits and Personalities",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "12",
    title: "Veiled Gaze: Shadows of Identity",
    image: palePortrait,
    dimensions: "18\" × 24\"",
    price: 11000,
    description: "A haunting and evocative oil portrait emerges from the depths of a pitch-black void, commanding attention with its raw emotional intensity. The subject's pale, sculptural face is rendered in sweeping strokes of ivory, ash, and muted rose, while deep charcoal shadows pool dramatically around piercing blue eyes that seem to hold an unspoken narrative. Bold crimson lips provide the sole burst of warm color, a striking counterpoint to the cool, spectral palette. Flashes of gold and amber dance atop the head like fleeting thoughts or fragile crowns, adding a surreal, almost otherworldly dimension. Signed \"Upasna '23,\" this piece masterfully balances vulnerability and defiance — a meditation on identity, perception, and the masks we wear beneath the surface.",
    collection: "Portraits and Personalities",
    available: true,
    medium: "Oil",
    material: "Canvas"
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
