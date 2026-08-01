alter table public.profiles
add column bio text check (char_length(bio) <= 500),
add column hiking_goals text[] not null default '{}',
add column measurement_unit text not null default 'metric';

alter table public.profiles
add constraint profiles_hiking_goals_check check (
  hiking_goals <@ array[
    'sunrise',
    'first-summit',
    'challenge',
    'photography',
    'nature'
  ]::text[]
  and cardinality(hiking_goals) <= 3
),
add constraint profiles_measurement_unit_check check (
  measurement_unit in ('metric', 'imperial')
),
add constraint profiles_preferred_region_check check (
  preferred_region is null
  or preferred_region in (
    'jawa',
    'sumatera',
    'bali-nusa-tenggara',
    'kalimantan',
    'sulawesi'
  )
);

comment on column public.profiles.hiking_goals is
  'Up to three stable Finder goal identifiers selected by the profile owner.';

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'avatars',
  'avatars',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Users can read their own avatar objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users can upload their own avatar objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users can update their own avatar objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users can delete their own avatar objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create function private.delete_current_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  delete from auth.users where id = current_user_id;
end;
$$;

revoke execute on function private.delete_current_user() from public, anon;
grant execute on function private.delete_current_user() to authenticated;

create function public.delete_my_account()
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.delete_current_user();
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

comment on function public.delete_my_account() is
  'Irreversibly deletes only the authenticated caller and cascades owned app data.';
