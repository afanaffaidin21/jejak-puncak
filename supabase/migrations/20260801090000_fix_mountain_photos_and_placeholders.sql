-- Fix mountain hero images: set 6 location-verified working photos, revert 6 to standard placeholder SVG

UPDATE public.mountains
SET hero_image = '/images/mountains/placeholder-mountain.svg',
    updated_at = NOW()
WHERE slug IN (
  'gunung-kelimutu',
  'gunung-rinjani',
  'gunung-merbabu',
  'gunung-kerinci',
  'gunung-papandayan',
  'gunung-tambora'
);
