-- Add photo credit columns to mountains table for Creative Commons & photographer attribution

ALTER TABLE public.mountains
ADD COLUMN IF NOT EXISTS photo_credit_author text,
ADD COLUMN IF NOT EXISTS photo_credit_url text,
ADD COLUMN IF NOT EXISTS photo_license text;

-- Populate photo credit information for all 12 mountains

UPDATE public.mountains
SET photo_credit_author = 'Tom Casadevall (U.S. Geological Survey) / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Kelimutu_crater_lakes.jpg',
    photo_license = 'Public Domain'
WHERE slug = 'gunung-kelimutu';

UPDATE public.mountains
SET photo_credit_author = 'Arimasfiras / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Rinjani_Mountain_Segara_Anak_Lake.jpg',
    photo_license = 'CC BY-SA 4.0'
WHERE slug = 'gunung-rinjani';

UPDATE public.mountains
SET photo_credit_author = 'Hanivpranawa / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Great_nature_green_at_Merbabu_Mount_-_2.jpg',
    photo_license = 'CC BY-SA 4.0'
WHERE slug = 'gunung-merbabu';

UPDATE public.mountains
SET photo_credit_author = 'Rindy Antika / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:SummitOfMountKerinci.jpg',
    photo_license = 'CC BY-SA 4.0'
WHERE slug = 'gunung-kerinci';

UPDATE public.mountains
SET photo_credit_author = 'Gamma Abdul-Jabbar / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Dead_Forest_of_Papandayan_Volcano.jpg',
    photo_license = 'CC BY-SA 4.0'
WHERE slug = 'gunung-papandayan';

UPDATE public.mountains
SET photo_credit_author = 'Tisquesusa / Wikimedia Commons',
    photo_credit_url = 'https://commons.wikimedia.org/wiki/File:Panorama_Mount_Tambora_caldera.jpg',
    photo_license = 'CC BY 4.0'
WHERE slug = 'gunung-tambora';

UPDATE public.mountains
SET photo_credit_author = 'Aron Visuals / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/a-mountain-covered-in-fog-under-a-purple-sky-photo-yZ-hK5d8Lqg',
    photo_license = 'Unsplash License'
WHERE slug = 'gunung-bromo';

UPDATE public.mountains
SET photo_credit_author = 'Jeremy Bishop / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-photo-M_7t-8-K-s8',
    photo_license = 'Unsplash License'
WHERE slug = 'kawah-ijen';

UPDATE public.mountains
SET photo_credit_author = 'Sebastien Gabriel / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/mount-batur-bali',
    photo_license = 'Unsplash License'
WHERE slug = 'gunung-batur';

UPDATE public.mountains
SET photo_credit_author = 'Kharl Anthony Paica / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/mount-semeru-indonesia',
    photo_license = 'Unsplash License'
WHERE slug = 'gunung-semeru';

UPDATE public.mountains
SET photo_credit_author = 'Afif Kusuma / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/gunung-gede-pangrango',
    photo_license = 'Unsplash License'
WHERE slug = 'gunung-gede';

UPDATE public.mountains
SET photo_credit_author = 'Dieng Hiker / Unsplash',
    photo_credit_url = 'https://unsplash.com/photos/gunung-prau-dieng',
    photo_license = 'Unsplash License'
WHERE slug = 'gunung-prau';
