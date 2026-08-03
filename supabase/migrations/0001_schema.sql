-- Armando Veículos — schema base
-- Tabela única de veículos com colunas nulas por categoria (carros / motos / náutica).

create type vehicle_category as enum ('carros', 'motos', 'nautica');
create type vehicle_status as enum ('rascunho', 'ativo', 'reservado', 'vendido');

create table public.vehicles (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  category            vehicle_category not null,
  make                text not null,
  model               text not null,
  version             text,
  title               text not null,
  year_manufacture    int not null,
  year_model          int not null,
  price               numeric(12, 2) not null,
  previous_price      numeric(12, 2),
  mileage             int,           -- carros, motos
  engine_hours        int,           -- náutica
  transmission        text,          -- carros
  fuel                text,
  engine              text,
  engine_displacement int,           -- motos (cc)
  body_type           text,          -- carros
  doors               int,           -- carros
  color               text,
  condition           text,
  description         text,
  features            jsonb not null default '[]'::jsonb,
  status              vehicle_status not null default 'rascunho',
  featured            boolean not null default false,
  cover_image         text,
  internal_notes      text,          -- nunca exposto publicamente
  financing_note      text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.vehicle_images (
  id           uuid primary key default gen_random_uuid(),
  vehicle_id   uuid not null references public.vehicles (id) on delete cascade,
  storage_path text not null,
  sort_order   int not null default 0,
  alt_text     text,
  created_at   timestamptz not null default now()
);

create index vehicles_public_idx on public.vehicles (status, category, created_at desc);
create index vehicles_featured_idx on public.vehicles (featured) where status = 'ativo';
create index vehicle_images_order_idx on public.vehicle_images (vehicle_id, sort_order);

create function public.set_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row
execute function public.set_updated_at();
