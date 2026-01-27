-- Create storage bucket for painting images
INSERT INTO storage.buckets (id, name, public)
VALUES ('paintings', 'paintings', true);

-- Allow anyone to view painting images (public bucket)
CREATE POLICY "Anyone can view painting images"
ON storage.objects FOR SELECT
USING (bucket_id = 'paintings');

-- Allow admins to upload painting images
CREATE POLICY "Admins can upload painting images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'paintings' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update painting images
CREATE POLICY "Admins can update painting images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'paintings' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete painting images
CREATE POLICY "Admins can delete painting images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'paintings' 
  AND public.has_role(auth.uid(), 'admin')
);