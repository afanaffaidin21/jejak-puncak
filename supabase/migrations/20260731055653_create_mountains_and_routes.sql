create type public.difficulty as enum (
  'easy',
  'moderate',
  'hard',
  'extreme'
);

create table public.mountains (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  province text not null,
  island text not null,
  elevation integer not null check (elevation > 0),
  latitude numeric(9, 6) not null check (latitude between -90 and 90),
  longitude numeric(9, 6) not null check (longitude between -180 and 180),
  summary text not null,
  description text not null,
  difficulty public.difficulty not null,
  beginner_score integer not null check (beginner_score between 0 and 100),
  duration_days numeric(3, 1) not null check (duration_days > 0),
  budget_category text not null,
  best_season text not null,
  sunrise_rating integer not null check (sunrise_rating between 0 and 5),
  camping_available boolean not null default false,
  water_source boolean not null default false,
  popularity_score integer not null check (popularity_score between 0 and 100),
  hero_image text not null,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.mountain_routes (
  id uuid primary key default gen_random_uuid(),
  mountain_id uuid not null references public.mountains(id) on delete cascade,
  name text not null,
  starting_point text not null,
  distance_km numeric(6, 2) not null check (distance_km > 0),
  elevation_gain integer not null check (elevation_gain >= 0),
  estimated_hours numeric(4, 1) not null check (estimated_hours > 0),
  difficulty public.difficulty not null,
  facilities text not null,
  description text not null,
  unique (mountain_id, name)
);

create index mountains_province_idx on public.mountains (province);
create index mountains_difficulty_idx on public.mountains (difficulty);
create index mountains_elevation_idx on public.mountains (elevation);
create index mountain_routes_mountain_id_idx on public.mountain_routes (mountain_id);

comment on table public.mountains is
  'Editorial mountain discovery records. Operational access and hazard status must be checked with the relevant authority.';
comment on table public.mountain_routes is
  'Planning estimates for public mountain routes, not live safety or permit guidance.';

revoke all privileges on table public.mountains from public, anon, authenticated;
revoke all privileges on table public.mountain_routes from public, anon, authenticated;

grant select on table public.mountains to anon, authenticated;
grant select on table public.mountain_routes to anon, authenticated;
grant all privileges on table public.mountains to service_role;
grant all privileges on table public.mountain_routes to service_role;

alter table public.mountains enable row level security;
alter table public.mountain_routes enable row level security;

create policy "Published mountains are publicly readable"
on public.mountains
for select
to anon, authenticated
using (status = 'published');

create policy "Routes for published mountains are publicly readable"
on public.mountain_routes
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.mountains
    where mountains.id = mountain_routes.mountain_id
      and mountains.status = 'published'
  )
);
