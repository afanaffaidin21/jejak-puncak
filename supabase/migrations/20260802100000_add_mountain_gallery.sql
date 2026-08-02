-- Add gallery_images column to mountains table
ALTER TABLE public.mountains
ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb NOT NULL;

-- Populate gallery_images for Gunung Kelimutu
UPDATE public.mountains
SET gallery_images = '[
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Kelimutu_lakes.jpg",
    "alt": "Kawah Tiwu Nuwa Muri Koo Fai dan Tiwu Ata Polo",
    "caption": "Dua kawah sebelah timur dari Gunung Kelimutu.",
    "credit_author": "Snpoj",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutu_lakes.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Kelimutulakes1.jpg",
    "alt": "Tiga danau kawah Kelimutu dari udara",
    "caption": "Kawah tiga warna Kelimutu di Pulau Flores, Indonesia.",
    "credit_author": "Brocken Inaglory",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutulakes1.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/8/83/Kelimutu_sunrise.jpg",
    "alt": "Matahari terbit di Danau Kelimutu",
    "caption": "Pemandangan Danau Kelimutu saat matahari terbit.",
    "credit_author": "Spencer Weart",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kelimutu_sunrise.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/7/70/Flores_Moni_Kelimutu.jpg",
    "alt": "Area sekitar Moni dan Danau Kelimutu",
    "caption": "Pemandangan danau di dalam kawah vulkanik Kelimutu.",
    "credit_author": "Serenade",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Flores_Moni_Kelimutu.jpg",
    "license": "CC BY-SA 3.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
]'::jsonb
WHERE slug = 'gunung-kelimutu';

-- Populate gallery_images for Gunung Rinjani
UPDATE public.mountains
SET gallery_images = '[
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/5/51/Kaldera_Gunung_Rinjani.jpg",
    "alt": "Kaldera Gunung Rinjani dan Segara Anak",
    "caption": "Taman Nasional Gunung Rinjani - Kaldera Danau Segara Anak.",
    "credit_author": "Abdul Fatah",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Kaldera_Gunung_Rinjani.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/4/44/Gunung_Rinjani_dan_danau_Segara_Anak.jpg",
    "alt": "Gunung Rinjani dan Danau Segara Anak dari puncak",
    "caption": "Bentang alam Gunung Rinjani dan Danau Segara Anak diambil dari puncak tertinggi.",
    "credit_author": "Suryasriyama",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Gunung_Rinjani_dan_danau_Segara_Anak.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Mount_Rinjani_Panorama.jpg",
    "alt": "Panorama Puncak dan Kawah Rinjani",
    "caption": "Panorama Gunung Rinjani beserta puncak, kawah, dan kerucut abu vulkanik.",
    "credit_author": "Jaccoob23",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Mount_Rinjani_Panorama.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Tenang_Pagi_Hari.jpg",
    "alt": "Pemandangan dari Pelawangan Sembalun",
    "caption": "Camp Pendakian terakhir di Pelawangan Sembalun dengan latar Danau Segara Anak.",
    "credit_author": "Ryangustiawan",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Tenang_Pagi_Hari.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
]'::jsonb
WHERE slug = 'gunung-rinjani';

-- Populate gallery_images for Gunung Bromo
UPDATE public.mountains
SET gallery_images = '[
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Bromo_Tengger_Semeru_National_Park_Java_500.jpg",
    "alt": "Pura Luhur Poten dan Gunung Bromo",
    "caption": "Pura Luhur Poten di Taman Nasional Bromo Tengger Semeru dengan latar Gunung Bromo.",
    "credit_author": "Arabsalam",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Tengger_Semeru_National_Park_Java_500.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bromo_Tengger_Semeru_National_Park_Java_505.jpg",
    "alt": "Bibir Kawah Gunung Bromo",
    "caption": "Tepi kawah Gunung Bromo yang masih aktif.",
    "credit_author": "Arabsalam",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Tengger_Semeru_National_Park_Java_505.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Berkuda_di_Tengah_Lautan_Pasir.jpg",
    "alt": "Kuda di Lautan Pasir Bromo",
    "caption": "Wisatawan menunggang kuda di tengah Lautan Pasir menuju kawah Bromo.",
    "credit_author": "Ardianay",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Berkuda_di_Tengah_Lautan_Pasir.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    "src": "https://upload.wikimedia.org/wikipedia/commons/d/da/Bromo_Sunrise.jpg",
    "alt": "Matahari terbit di Gunung Bromo",
    "caption": "Semburat cahaya pertama di Taman Nasional Bromo Tengger Semeru.",
    "credit_author": "Jeremia Pasaribu",
    "credit_url": "https://commons.wikimedia.org/wiki/File:Bromo_Sunrise.jpg",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
]'::jsonb
WHERE slug = 'gunung-bromo';
