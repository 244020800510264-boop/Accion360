-- Ejecutar en Supabase → SQL Editor → New query → Run
-- Tabla de actividades de servicio (horas)

create table if not exists public.service_activities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  detail text not null,
  hours numeric not null check (hours >= 0),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists service_activities_created_at_idx
  on public.service_activities (created_at desc);

alter table public.service_activities enable row level security;

-- Políticas para el cliente con la clave publicable (anon).
-- Ajusta cuando uses Supabase Auth (por ejemplo auth.uid() = user_id).
create policy "service_activities_select_anon"
  on public.service_activities for select
  to anon
  using (true);

create policy "service_activities_insert_anon"
  on public.service_activities for insert
  to anon
  with check (true);

create policy "service_activities_update_anon"
  on public.service_activities for update
  to anon
  using (true)
  with check (true);

create policy "service_activities_delete_anon"
  on public.service_activities for delete
  to anon
  using (true);
