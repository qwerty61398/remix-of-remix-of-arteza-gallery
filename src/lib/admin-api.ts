import { supabase } from "@/integrations/supabase/client";

type AdminAction = "insert" | "update" | "delete";

interface AdminMutationParams {
  action: AdminAction;
  table: string;
  data?: Record<string, unknown>;
  id?: string;
}

export async function adminMutation({ action, table, data, id }: AdminMutationParams) {
  const { data: result, error } = await supabase.functions.invoke("admin-mutations", {
    body: { action, table, data, id },
  });

  if (error) {
    throw new Error(error.message || "Admin mutation failed");
  }

  if (result?.error) {
    throw new Error(result.error);
  }

  return result?.data;
}
