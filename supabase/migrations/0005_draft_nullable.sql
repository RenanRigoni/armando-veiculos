-- Permite salvar rascunho de veículo só com `category` preenchido.
-- Publicar (status != 'rascunho') continua exigindo os campos essenciais.

alter table public.vehicles
  alter column slug drop not null,
  alter column make drop not null,
  alter column model drop not null,
  alter column title drop not null,
  alter column year_manufacture drop not null,
  alter column year_model drop not null,
  alter column price drop not null;

alter table public.vehicles
  add constraint vehicles_publish_requires_core_fields check (
    status = 'rascunho'
    or (
      slug is not null
      and make is not null
      and model is not null
      and title is not null
      and year_manufacture is not null
      and year_model is not null
      and price is not null
    )
  );
