-- Wikimedia recommends thumbnail derivatives instead of repeatedly serving
-- multi-megabyte originals to image optimization services.
UPDATE public.mountains
SET hero_image = CASE slug
  WHEN 'gunung-rinjani' THEN 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Rinjani_Mountain_Segara_Anak_Lake.jpg/1920px-Rinjani_Mountain_Segara_Anak_Lake.jpg'
  WHEN 'gunung-merbabu' THEN 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Great_nature_green_at_Merbabu_Mount_-_2.jpg/1920px-Great_nature_green_at_Merbabu_Mount_-_2.jpg'
  WHEN 'gunung-kerinci' THEN 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/SummitOfMountKerinci.jpg/1920px-SummitOfMountKerinci.jpg'
  WHEN 'gunung-papandayan' THEN 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Dead_Forest_of_Papandayan_Volcano.jpg/1920px-Dead_Forest_of_Papandayan_Volcano.jpg'
  WHEN 'gunung-tambora' THEN 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Panorama_Mount_Tambora_caldera.jpg/1920px-Panorama_Mount_Tambora_caldera.jpg'
  ELSE hero_image
END,
updated_at = NOW()
WHERE slug IN (
  'gunung-rinjani',
  'gunung-merbabu',
  'gunung-kerinci',
  'gunung-papandayan',
  'gunung-tambora'
);
