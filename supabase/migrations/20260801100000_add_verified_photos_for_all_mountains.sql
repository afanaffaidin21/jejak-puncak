-- Update hero_image URLs for remaining 6 mountains with location-verified photography

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Kelimutu_crater_lakes.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-kelimutu';

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Rinjani_Mountain_Segara_Anak_Lake.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-rinjani';

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Great_nature_green_at_Merbabu_Mount_-_2.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-merbabu';

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/3/31/SummitOfMountKerinci.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-kerinci';

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Dead_Forest_of_Papandayan_Volcano.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-papandayan';

UPDATE public.mountains
SET hero_image = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Panorama_Mount_Tambora_caldera.jpg',
    updated_at = NOW()
WHERE slug = 'gunung-tambora';
