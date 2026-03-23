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
import morningSerenity from "@/assets/paintings/morning-serenity.webp";
import crimsonMuse from "@/assets/paintings/crimson-muse.jpg";
import krishnaFlute from "@/assets/paintings/krishna-flute.webp";
import geometricVases from "@/assets/paintings/geometric-vases.jpg";
import sunflowerJug from "@/assets/paintings/sunflower-jug.webp";
import crimsonBouquet from "@/assets/paintings/crimson-bouquet.jpg";
import blueDahliaVase from "@/assets/paintings/blue-dahlia-vase.webp";
import azurePoppies from "@/assets/paintings/azure-poppies.webp";
import gardenRosesBurst from "@/assets/paintings/garden-roses-burst.jpg";
import blueIrises from "@/assets/paintings/blue-irises.jpg";
import redTulipsTeal from "@/assets/paintings/red-tulips-teal.jpg";

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
  },
  {
    id: "13",
    title: "Morning Serenity: A Quiet Reverie",
    image: morningSerenity,
    dimensions: "18\" × 24\"",
    price: 25000,
    description: "A contemplative oil painting capturing a woman in a flowing white robe, seated on rumpled lavender sheets, gazing out through a sunlit window while cradling a warm cup. Soft blues and muted purples bathe the scene in morning light, while confident brushwork renders the fabric's folds and the figure's graceful posture with intimate realism. A meditation on solitude, stillness, and the gentle beauty of unhurried mornings.",
    collection: "Portraits and Personalities",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "14",
    title: "The Crimson Muse",
    image: crimsonMuse,
    dimensions: "36\" × 24\"",
    price: 32000,
    description: "A striking oil portrait of a woman with cascading auburn curls that blaze like living flame, her enigmatic grey-green eyes holding the viewer in a steady, knowing gaze. A delicate pearl earring catches the light against her porcelain skin, while a teal garment hints at quiet elegance. Signed \"Upasna '23,\" the painting channels Modigliani's elongated grace with a warmth and sensuality all its own — a celebration of feminine allure and unapologetic presence.",
    collection: "Portraits and Personalities",
    available: true,
    medium: "Oil",
    material: "Canvas"
  },
  {
    id: "15",
    title: "Krishna's Melody: Lotus Garden Serenade",
    image: krishnaFlute,
    dimensions: "18\" × 24\"",
    price: 15000,
    description: "A devotional acrylic painting depicting Lord Krishna seated serenely amidst a sea of pink lotus blossoms, playing the divine flute with closed eyes and meditative grace. A majestic peacock perches nearby on moss-covered rocks, its iridescent plumage fanning outward, while towering forest trees rise into a luminous blue sky. The composition blends spiritual reverence with nature's beauty, evoking the eternal melody of Vrindavan.",
    collection: "Cultural Chronicles",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "16",
    title: "Chromatic Still Life: Vases in Dialogue",
    image: geometricVases,
    dimensions: "18\" × 24\"",
    price: 12000,
    description: "A bold, pop-art-inspired acrylic still life featuring three vases rendered in vivid geometric planes — an angular emerald vessel, a sinuous red-and-magenta form, and a luminous cerulean globe — arranged against contrasting color-blocked backgrounds. A plate of stylized fruits and a cheerful striped tablecloth complete this exuberant celebration of color, form, and playful abstraction.",
    collection: "Abstract Expressions",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "17",
    title: "Sunlit Harvest: Sunflowers in Clay",
    image: sunflowerJug,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A charming acrylic study of golden sunflowers bursting from a rustic terracotta jug, their radiant petals and dark centers rendered with lively impasto strokes. An abstract grid-like background in muted greys and whites provides dramatic contrast, letting the warm yellows and rich browns sing with earthy vitality.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "18",
    title: "Crimson Cascade: Blooms in Red",
    image: crimsonBouquet,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A lush acrylic floral painting featuring an abundant arrangement of pink dahlias, white lilies, and deep purple blooms spilling from a glossy crimson vase. Set against a striking cobalt blue and warm umber background, the composition radiates passionate energy and romantic elegance.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "19",
    title: "Midnight Dahlias: Cobalt Embrace",
    image: blueDahliaVase,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A richly textured acrylic painting of pink and crimson dahlias mingled with delicate white daisies, nestled in a lustrous cobalt blue vase. The dark, moody background enhances the jewel-toned petals, creating an intimate and timeless floral portrait.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "20",
    title: "Azure Petals: Summer's Whisper",
    image: azurePoppies,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A vibrant close-up acrylic study of brilliant sky-blue flowers with golden centres, accompanied by warm amber blossoms against a soft lavender backdrop. The bold, confident brushwork captures the delicate veining of each petal, creating an immersive burst of summer colour and joy.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "21",
    title: "Garden Riot: Roses Unbound",
    image: gardenRosesBurst,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A joyous explosion of colour signed by the artist Upasna, this acrylic canvas overflows with swirling pink and magenta roses, fiery orange cosmos, a pristine white bloom, and sunny yellow daisies against a kaleidoscopic background of gold, blue, and green. Every inch pulses with floral exuberance and painterly confidence.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "22",
    title: "Sapphire Irises: Marbled Dreams",
    image: blueIrises,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "An expressive acrylic painting of vivid royal-blue irises springing from a hand-painted glass vase swirled with amber and crimson. The ethereal marbled background in mint, lavender, and pink adds a dreamlike quality, blending fluid abstraction with the structured beauty of the flowers.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
    material: "Canvas"
  },
  {
    id: "23",
    title: "Teal Window: Red Roses Ascending",
    image: redTulipsTeal,
    dimensions: "12\" × 12\"",
    price: 3000,
    description: "A striking acrylic composition of crimson rose buds rising on slender green stems from an ornate blue ceramic planter, set against a bold teal and chartreuse background with architectural hints. The confident linework and saturated palette evoke a modern, graphic sensibility rooted in the tradition of botanical painting.",
    collection: "Nature's Palette",
    available: true,
    medium: "Acrylic",
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
