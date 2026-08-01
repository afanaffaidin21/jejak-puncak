create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 60),
  avatar_url text,
  experience_level text check (
    experience_level in ('beginner', 'intermediate', 'advanced')
  ),
  fitness_level text check (fitness_level in ('low', 'moderate', 'high')),
  preferred_region text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Basic application profiles owned by the matching Supabase Auth user.';

revoke all privileges on table public.profiles from public, anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;
grant all privileges on table public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check (id = (select auth.uid()));

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create or replace function public.sync_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  resolved_display_name text;
begin
  resolved_display_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(split_part(new.email, '@', 1), ''),
    'Pendaki'
  );

  if char_length(resolved_display_name) < 2 then
    resolved_display_name := 'Pendaki';
  end if;

  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    left(resolved_display_name, 60),
    nullif(trim(new.raw_user_meta_data ->> 'avatar_url'), '')
  )
  on conflict (id) do update
  set
    display_name = excluded.display_name,
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();

  return new;
end;
$$;

revoke execute on function public.sync_auth_user_profile() from public, anon, authenticated;

create trigger on_auth_user_profile_sync
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.sync_auth_user_profile();

insert into public.profiles (id, display_name, avatar_url)
select
  users.id,
  case
    when char_length(
      coalesce(
        nullif(trim(users.raw_user_meta_data ->> 'display_name'), ''),
        nullif(trim(users.raw_user_meta_data ->> 'full_name'), ''),
        nullif(split_part(users.email, '@', 1), ''),
        'Pendaki'
      )
    ) < 2 then 'Pendaki'
    else left(
      coalesce(
        nullif(trim(users.raw_user_meta_data ->> 'display_name'), ''),
        nullif(trim(users.raw_user_meta_data ->> 'full_name'), ''),
        nullif(split_part(users.email, '@', 1), ''),
        'Pendaki'
      ),
      60
    )
  end,
  nullif(trim(users.raw_user_meta_data ->> 'avatar_url'), '')
from auth.users as users
on conflict (id) do update
set
  display_name = excluded.display_name,
  avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
  updated_at = now();
