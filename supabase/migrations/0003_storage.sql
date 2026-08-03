-- Armando Veículos — bucket público de fotos de veículo
-- Fotos de anúncio são ativos públicos. Escrita/remoção só para usuário autenticado.

insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;

create policy vehicle_images_storage_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'vehicle-images');

create policy vehicle_images_storage_admin_write on storage.objects
  for insert to authenticated
  with check (bucket_id = 'vehicle-images');

create policy vehicle_images_storage_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'vehicle-images')
  with check (bucket_id = 'vehicle-images');

create policy vehicle_images_storage_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'vehicle-images');
