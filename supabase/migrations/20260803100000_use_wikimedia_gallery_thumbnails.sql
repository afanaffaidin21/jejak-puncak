-- Wikimedia recommends thumbnail derivatives instead of repeatedly serving
-- multi-megabyte originals to image optimization services. The original
-- full-resolution gallery URLs for Bromo and Kelimutu were hitting Wikimedia's
-- rate limit (HTTP 429), causing broken images. Switch to 1920px thumbnails,
-- the same pattern already used for hero images in
-- 20260801135103_use_wikimedia_thumbnails.sql.

-- Gunung Bromo
UPDATE public.mountains
SET gallery_images = '[
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Bromo_Tengger_Semeru_National_Park_Java_500.jpg/1920px-Bromo_Tengger_Semeru_National_Park_Java_500.jpg",
    "alt": "Pura Luhur Poten dan Gunung Bromo",
    "caption": "Pura Luhur Poten di Taman Nasional Bromo Tengger Semeru dengan latar Gunung Bromo.",
    "credit_author": "Arabsalam",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Tengger_Semeru_National_Park_Java_500.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Bromo_Tengger_Semeru_National_Park_Java_505.jpg/1920px-Bromo_Tengger_Semeru_National_Park_Java_505.jpg",
    "alt": "Bibir Kawah Gunung Bromo",
    "caption": "Tepi kawah Gunung Bromo yang masih aktif.",
    "credit_author": "Arabsalam",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Tengger_Semeru_National_Park_Java_505.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Berkuda_di_Tengah_Lautan_Pasir.jpg/1920px-Berkuda_di_Tengah_Lautan_Pasir.jpg",
    "alt": "Kuda di Lautan Pasir Bromo",
    "caption": "Wisatawan menunggang kuda di tengah Lautan Pasir menuju kawah Bromo.",
    "credit_author": "Ardianay",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Berkuda_di_Tengah_Lautan_Pasir.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bromo_Sunrise.jpg/1920px-Bromo_Sunrise.jpg",
    "alt": "Matahari terbit di Gunung Bromo",
    "caption": "Semburat cahaya pertama di Taman Nasional Bromo Tengger Semeru.",
    "credit_author": "Jeremia Pasaribu",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Sunrise.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
]'::jsonb
WHERE slug = 'gunung-bromo';

-- Gunung Kelimutu
UPDATE public.mountains
SET gallery_images = '[
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Kelimutu_lakes.jpg/1920px-Kelimutu_lakes.jpg",
    "alt": "Kawah Tiwu Nuwa Muri Koo Fai dan Tiwu Ata Polo",
    "caption": "Dua kawah sebelah timur dari Gunung Kelimutu.",
    "credit_author": "Snpoj",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutu_lakes.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kelimutulakes1.jpg/1920px-Kelimutulakes1.jpg",
    "alt": "Tiga danau kawah Kelimutu dari udara",
    "caption": "Kawah tiga warna Kelimutu di Pulau Flores, Indonesia.",
    "credit_author": "Brocken Inaglory",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutulakes1.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Kelimutu_sunrise.jpg/1920px-Kelimutu_sunrise.jpg",
    "alt": "Matahari terbit di Danau Kelimutu",
    "caption": "Pemandangan Danau Kelimutu saat matahari terbit.",
    "credit_author": "Spencer Weart",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutu_sunrise.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Flores_Moni_Kelimutu.jpg/1920px-Flores_Moni_Kelimutu.jpg",
    "alt": "Area sekitar Moni dan Danau Kelimutu",
    "caption": "Pemandangan danau di dalam kawah vulkanik Kelimutu.",
    "credit_author": "Serenade",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Flores_Moni_Kelimutu.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
]'::jsonb
WHERE slug = 'gunung-kelimutu';