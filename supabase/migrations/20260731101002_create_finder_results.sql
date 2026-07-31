create table public.finder_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  answers jsonb not null check (jsonb_typeof(answers) = 'object'),
  top_recommendation uuid not null references public.mountains(id) on delete restrict,
  recommendation_payload jsonb not null check (jsonb_typeof(recommendation_payload) = 'object'),
  created_at timestamptz not null default now()
);

create index finder_results_user_id_idx
on public.finder_results (user_id);

create index finder_results_top_recommendation_idx
on public.finder_results (top_recommendation);

create index finder_results_created_at_idx
on public.finder_results (created_at desc);

comment on table public.finder_results is
  'Finder answers and deterministic recommendation snapshots. AI narrative is not persisted.';

revoke all privileges on table public.finder_results from public, anon, authenticated;
grant insert on table public.finder_results to anon, authenticated;
grant select on table public.finder_results to authenticated;
grant all privileges on table public.finder_results to service_role;

alter table public.finder_results enable row level security;

create policy "Guests can save anonymous Finder results"
on public.finder_results
for insert
to anon
with check (user_id is null);

create policy "Users can save their own Finder results"
on public.finder_results
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Users can read their own Finder results"
on public.finder_results
for select
to authenticated
using (user_id = (select auth.uid()));
