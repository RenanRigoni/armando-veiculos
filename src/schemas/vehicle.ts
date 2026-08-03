import { z } from "zod";

/**
 * Espelha a constraint `vehicles_publish_requires_core_fields`
 * (supabase/migrations/0005_draft_nullable.sql): rascunho só exige `category`,
 * publicar exige os campos essenciais + slug único + ao menos 1 imagem.
 */

const categorySchema = z.enum(["carros", "motos", "nautica"]);

const draftFields = {
  category: categorySchema,
  slug: z.string().trim().min(1).optional(),
  make: z.string().trim().min(1).optional(),
  model: z.string().trim().min(1).optional(),
  version: z.string().trim().optional(),
  title: z.string().trim().min(1).optional(),
  yearManufacture: z.coerce
    .number()
    .int("Informe um ano inteiro.")
    .min(1900, "O ano deve ser igual ou posterior a 1900.")
    .max(2100, "O ano deve ser igual ou anterior a 2100.")
    .optional(),
  yearModel: z.coerce
    .number()
    .int("Informe um ano inteiro.")
    .min(1900, "O ano deve ser igual ou posterior a 1900.")
    .max(2100, "O ano deve ser igual ou anterior a 2100.")
    .optional(),
  price: z.coerce.number().positive().optional(),
  previousPrice: z.coerce.number().positive().optional(),
  mileage: z.coerce.number().int().nonnegative().optional(),
  engineHours: z.coerce.number().int().nonnegative().optional(),
  transmission: z.string().trim().optional(),
  fuel: z.string().trim().optional(),
  engine: z.string().trim().optional(),
  engineDisplacement: z.coerce.number().int().positive().optional(),
  bodyType: z.string().trim().optional(),
  doors: z.coerce.number().int().positive().optional(),
  color: z.string().trim().optional(),
  condition: z.string().trim().optional(),
  description: z.string().trim().optional(),
  features: z.array(z.string()).optional(),
  financingNote: z.string().trim().optional(),
};

/** "Salvar rascunho" — só `category` é obrigatório. */
export const vehicleDraftSchema = z.object(draftFields);
export type VehicleDraftSchema = z.infer<typeof vehicleDraftSchema>;

/**
 * "Publicar" — exige os campos essenciais, slug e ao menos 1 imagem.
 * Unicidade do slug é validada no server action (Fase 3), contra o banco.
 */
export const vehiclePublishSchema = z.object({
  ...draftFields,
  slug: z.string().trim().min(1, "Informe o slug."),
  make: z.string().trim().min(1, "Informe a marca."),
  model: z.string().trim().min(1, "Informe o modelo."),
  title: z.string().trim().min(1, "Informe o título."),
  yearManufacture: z.coerce.number().int().min(1900).max(2100),
  yearModel: z.coerce.number().int().min(1900).max(2100),
  price: z.coerce.number().positive("Informe o preço."),
  images: z.array(z.string()).min(1, "Adicione ao menos uma foto."),
});
export type VehiclePublishSchema = z.infer<typeof vehiclePublishSchema>;
