UPDATE public.paintings SET price = 3000 WHERE price = 2000;

INSERT INTO public.paintings (title, description, dimensions, collection, price, image_url, is_available, is_featured)
VALUES (
  'Cherry Blossoms: Pink Cascade',
  'A delicate acrylic painting of cascading pink and white cherry blossoms on a graceful branch, set against a moody blue-grey background. The soft petals and green leaves create a serene, springtime atmosphere full of natural beauty and gentle movement.',
  '12" × 12"',
  'Nature''s Palette',
  3000,
  '/paintings/cherry-blossoms.webp',
  true,
  false
);