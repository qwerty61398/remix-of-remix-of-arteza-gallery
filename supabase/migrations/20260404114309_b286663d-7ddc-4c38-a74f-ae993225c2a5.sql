ALTER TABLE public.paintings
  ADD COLUMN medium text DEFAULT 'Oil on Canvas',
  ADD COLUMN material text DEFAULT 'Canvas';