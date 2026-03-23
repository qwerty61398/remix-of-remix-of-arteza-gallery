import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Painting, CollectionType, paintings as staticPaintings } from "@/data/paintings";

interface DbPainting {
  id: string;
  title: string;
  description: string | null;
  dimensions: string | null;
  collection: string;
  price: number;
  image_url: string;
  is_available: boolean | null;
  is_featured: boolean | null;
  story: string | null;
}

// Build a lookup from title to static image
const staticImageMap = new Map(
  staticPaintings.map(p => [p.title, { image: p.image, medium: p.medium, material: p.material }])
);

function mapDbToPainting(db: DbPainting): Painting {
  const staticData = staticImageMap.get(db.title);
  // Prefer cloud storage URL; fall back to static asset if DB URL is a placeholder
  const isRealUrl = db.image_url.startsWith("http");
  return {
    id: db.id,
    title: db.title,
    image: isRealUrl ? db.image_url : (staticData?.image || db.image_url),
    dimensions: db.dimensions || "",
    price: db.price,
    description: db.description || "",
    collection: db.collection as CollectionType,
    available: db.is_available ?? true,
    medium: staticData?.medium || "",
    material: staticData?.material || "",
  };
}

export function usePaintings() {
  return useQuery({
    queryKey: ["paintings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paintings")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data as DbPainting[]).map(mapDbToPainting);
    },
  });
}

export function usePaintingById(id: string) {
  return useQuery({
    queryKey: ["paintings", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paintings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return mapDbToPainting(data as DbPainting);
    },
    enabled: !!id,
  });
}
