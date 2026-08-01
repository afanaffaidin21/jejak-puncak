create table public.user_mountains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mountain_id uuid not null references public.mountains(id) on delete cascade,
  status text not null check (status in ('wishlist', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint user_mountains_user_mountain_unique unique (user_id, mountain_id),
  constraint user_mountains_completed_at_check check (
    completed_at is null or status = 'completed'
  )
);

create index user_mountains_user_id_idx
on public.user_mountains (user_id);

create index user_mountains_mountain_id_idx
on public.user_mountains (mountain_id);

comment on table public.user_mountains is
  'Owner-scoped wishlist and completed-mountain records.';

revoke all privileges on table public.user_mountains from public, anon, authenticated;
grant select, insert, update, delete on table public.user_mountains to authenticated;
grant all privileges on table public.user_mountains to service_role;

alter table public.user_mountains enable row level security;

create policy "Users can read their own mountains"
on public.user_mountains
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can add their own mountains"
on public.user_mountains
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Users can update their own mountains"
on public.user_mountains
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users can remove their own mountains"
on public.user_mountains
for delete
to authenticated
using (user_id = (select auth.uid()));

grant update, delete on table public.finder_results to authenticated;

create policy "Users can update their own Finder results"
on public.finder_results
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users can delete their own Finder results"
on public.finder_results
for delete
to authenticated
using (user_id = (select auth.uid()));
