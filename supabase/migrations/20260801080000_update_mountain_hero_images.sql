-- Update hero_image URLs for 11 mountains with location-verified Unsplash photography

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-semeru';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1570784400755-d4d5e0327f3d?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-rinjani';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1609825595781-80d507b993c8?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-kerinci';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1627448839088-219500c5c36f?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-merbabu';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-gede';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1626248316271-9568910b5030?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-papandayan';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-bromo';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'kawah-ijen';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-batur';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-kelimutu';

UPDATE public.mountains
SET hero_image = 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    updated_at = NOW()
WHERE slug = 'gunung-prau';
