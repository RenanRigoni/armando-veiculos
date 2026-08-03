-- Armando Veículos — estoque de DEMONSTRAÇÃO
-- Dados fictícios usados só para a apresentação ao dono.
-- Todo registro traz internal_notes marcando que deve ser substituído por estoque real.

insert into public.vehicles (
  slug, category, make, model, version, title,
  year_manufacture, year_model, price, mileage, engine_hours,
  transmission, fuel, engine, engine_displacement, body_type, doors,
  color, condition, description, features, status, featured, cover_image, internal_notes
) values
(
  'chevrolet-s10-ltz-28-diesel-4x4-2024', 'carros', 'Chevrolet', 'S10', 'LTZ 2.8 Diesel 4x4',
  'Chevrolet S10 LTZ 2.8 Diesel 4x4', 2023, 2024, 249900.00, 38000, null,
  'Automático', 'Diesel', '2.8 Turbo Diesel', null, 'Picape', 4,
  'Prata', 'Seminovo',
  'Picape cabine dupla com tração 4x4, revisões em dia e manual do proprietário.',
  '["Ar-condicionado digital","Central multimídia","Câmera de ré","Controle de tração","Sensor de estacionamento","Bancos em couro"]'::jsonb,
  'ativo', true, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'toyota-corolla-xei-20-2023', 'carros', 'Toyota', 'Corolla', 'XEi 2.0',
  'Toyota Corolla XEi 2.0', 2022, 2023, 139900.00, 52000, null,
  'Automático', 'Flex', '2.0 16V', null, 'Sedan', 4,
  'Branco', 'Seminovo',
  'Sedan completo, único dono, revisões feitas na concessionária.',
  '["Ar-condicionado digital","Piloto automático","Central multimídia","Câmera de ré","Faróis de LED"]'::jsonb,
  'ativo', true, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'jeep-compass-longitude-13-t270-2022', 'carros', 'Jeep', 'Compass', 'Longitude 1.3 T270',
  'Jeep Compass Longitude 1.3 T270', 2022, 2022, 134900.00, 61000, null,
  'Automático', 'Flex', '1.3 Turbo T270', null, 'SUV', 4,
  'Cinza', 'Seminovo',
  'SUV com pacote Longitude, pneus novos e documentação em dia.',
  '["Ar-condicionado dual zone","Central multimídia","Câmera de ré","Rodas de liga leve","Sensor de chuva"]'::jsonb,
  'ativo', false, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'volkswagen-nivus-highline-200-tsi-2022', 'carros', 'Volkswagen', 'Nivus', 'Highline 200 TSI',
  'Volkswagen Nivus Highline 200 TSI', 2021, 2022, 109900.00, 47000, null,
  'Automático', 'Flex', '1.0 TSI', null, 'SUV', 4,
  'Preto', 'Seminovo',
  'Nivus na versão Highline, com painel digital e central VW Play.',
  '["Painel digital","VW Play","Câmera de ré","Piloto automático","Rodas de liga leve"]'::jsonb,
  'ativo', false, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'honda-cb-500f-2023', 'motos', 'Honda', 'CB 500F', null,
  'Honda CB 500F', 2022, 2023, 38900.00, 12400, null,
  null, 'Gasolina', 'Bicilíndrico 471cc', 471, null, null,
  'Vermelha', 'Seminovo',
  'Naked média, segunda dona, sem histórico de queda.',
  '["Freios ABS","Painel digital","Farol de LED"]'::jsonb,
  'ativo', true, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'yamaha-mt-03-2022', 'motos', 'Yamaha', 'MT-03', null,
  'Yamaha MT-03', 2021, 2022, 31900.00, 18900, null,
  null, 'Gasolina', 'Bicilíndrico 321cc', 321, null, null,
  'Azul', 'Seminovo',
  'Naked de entrada, ideal para uso urbano, revisões em dia.',
  '["Freios ABS","Painel digital","Farol de LED"]'::jsonb,
  'ativo', false, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'lancha-focker-242-2019', 'nautica', 'Focker', '242', null,
  'Lancha Focker 242', 2019, 2019, 289000.00, null, 180,
  null, 'Gasolina', 'Mercruiser 250HP', null, null, null,
  'Branca', 'Seminova',
  'Lancha com cabine, motor revisado e carreta rodoviária inclusa.',
  '["Carreta rodoviária","Som marinizado","Toldo","Escada de popa"]'::jsonb,
  'ativo', true, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
),
(
  'jet-ski-sea-doo-gti-130-2021', 'nautica', 'Sea-Doo', 'GTI 130', null,
  'Jet Ski Sea-Doo GTI 130', 2021, 2021, 74900.00, null, 95,
  null, 'Gasolina', 'Rotax 1503', null, null, null,
  'Azul', 'Seminovo',
  'Jet ski três lugares, com carreta e capa.',
  '["Carreta","Capa","Modo eco"]'::jsonb,
  'ativo', false, '/placeholder-vehicle.svg', 'REGISTRO DE DEMONSTRAÇÃO — substituir por estoque real'
);
