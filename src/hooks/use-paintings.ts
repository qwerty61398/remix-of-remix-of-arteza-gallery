import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Painting, CollectionType } from "@/data/paintings";

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

function mapDbToPainting(db: DbPainting): Painting {
  return {
    id: db.id,
    title: db.title,
    image: db.image_url,
    dimensions: db.dimensions || "",
    price: db.price,
    description: db.description || "",
    collection: db.collection as CollectionType,
    available: db.is_available ?? true,
    medium: "",
    material: "",
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

export function usePaintingsByCollection(collectionName: CollectionType) {
  return useQuery({
    queryKey: ["paintings", "collection", collectionName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("paintings")
        .select("*")
        .eq("collection", collectionName)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data as DbPainting[]).map(mapDbToPainting);
    },
    enabled: !!collectionName,
  });
}
