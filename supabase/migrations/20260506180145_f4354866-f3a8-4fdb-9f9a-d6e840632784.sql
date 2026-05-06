-- Validation trigger to ensure paintings.collection is one of the allowed values
CREATE OR REPLACE FUNCTION public.validate_painting_collection()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.collection NOT IN (
    'Abstract Expressions',
    'Cultural Chronicles',
    'Dreamscapes',
    'Nature''s Palette',
    'Portraits and Personalities'
  ) THEN
    RAISE EXCEPTION 'Invalid collection "%". Must be one of: Abstract Expressions, Cultural Chronicles, Dreamscapes, Nature''s Palette, Portraits and Personalities', NEW.collection;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_painting_collection_trigger ON public.paintings;
CREATE TRIGGER validate_painting_collection_trigger
BEFORE INSERT OR UPDATE ON public.paintings
FOR EACH ROW
EXECUTE FUNCTION public.validate_painting_collection();