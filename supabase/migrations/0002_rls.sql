-- Armando Veículos — RLS mínima (modo demo, um único admin)
-- Público (anon) lê apenas veículos ativos/reservados. Qualquer usuário autenticado é admin.

alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;

create policy vehicles_public_read on public.vehicles
  for select to anon
  using (status in ('ativo', 'reservado'));

create policy vehicles_admin_all on public.vehicles
  for all to authenticated
  using (true)
  with check (true);

create policy vehicle_images_public_read on public.vehicle_images
  for select to anon
  using (
    exists (
      select 1
      from public.vehicles v
      where v.id = vehicle_id
        and v.status in ('ativo', 'reservado')
    )
  );

create policy vehicle_images_admin_all on public.vehicle_images
  for all to authenticated
  using (true)
  with check (true);
