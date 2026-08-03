import { z } from "zod";

/**
 * Espelha a constraint `vehicles_publish_requires_core_fields`
 * (supabase/migrations/0005_draft_nullable.sql): rascunho só exige `category`,
 * publicar exige os campos essenciais + slug único + ao menos 1 imagem.
 */

const categorySchema = z.enum(["carros", "motos", "nautica"]);

const optionalNonEmptyString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

function optionalNumber(schema: z.ZodNumber) {
  return z.preprocess(
    (value) => {
      if (value === undefined) return undefined;
      if (typeof value === "string" && value.trim() === "") return undefined;
      if (typeof value === "string") return Number(value);
      if (typeof value === "number" && Number.isNaN(value)) return undefined;
      return value;
    },
    schema.optional(),
  );
}

function requiredNumber(schema: z.ZodNumber) {
  return z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() === "") return undefined;
      if (typeof value === "string") return Number(value);
      return value;
    },
    schema,
  );
}

const groupedWholeNumberPattern = /^-?\d{1,3}(?:\.\d{3})+$/;
const plainWholeNumberPattern = /^-?\d+$/;

function normalizeWholeNumber(value: unknown): unknown {
  if (typeof value === "number") return Number.isNaN(value) ? undefined : value;
  if (typeof value !== "string") return value;

  const normalized = value.trim();
  if (!normalized) return undefined;
  if (plainWholeNumberPattern.test(normalized)) return Number(normalized);
  if (groupedWholeNumberPattern.test(normalized)) {
    return Number(normalized.replaceAll(".", ""));
  }
  return value;
}

function optionalWholeNumber(schema: z.ZodNumber) {
  return z.preprocess(normalizeWholeNumber, schema.optional());
}

function requiredWholeNumber(schema: z.ZodNumber) {
  return z.preprocess(normalizeWholeNumber, schema);
}

const draftFields = {
  category: categorySchema,
  slug: optionalNonEmptyString,
  make: optionalNonEmptyString,
  model: optionalNonEmptyString,
  version: z.string().trim().optional(),
  title: optionalNonEmptyString,
  yearManufacture: optionalNumber(
    z
      .number()
      .int("Informe um ano inteiro.")
      .min(1900, "O ano deve ser igual ou posterior a 1900.")
      .max(2100, "O ano deve ser igual ou anterior a 2100."),
  ),
  yearModel: optionalNumber(
    z
      .number()
      .int("Informe um ano inteiro.")
      .min(1900, "O ano deve ser igual ou posterior a 1900.")
      .max(2100, "O ano deve ser igual ou anterior a 2100."),
  ),
  price: optionalWholeNumber(
    z
      .number({ error: "Informe o preço em números, com ou sem pontos." })
      .positive("Informe o preço."),
  ),
  previousPrice: optionalWholeNumber(
    z
      .number({ error: "Informe o preço anterior em números, com ou sem pontos." })
      .positive("Informe um preço anterior válido."),
  ),
  mileage: optionalWholeNumber(
    z
      .number({ error: "Informe a quilometragem em números, com ou sem pontos." })
      .int("Informe uma quilometragem inteira.")
      .nonnegative("A quilometragem não pode ser negativa."),
  ),
  engineHours: optionalNumber(z.number().int().nonnegative()),
  transmission: z.string().trim().optional(),
  fuel: z.string().trim().optional(),
  engine: z.string().trim().optional(),
  engineDisplacement: optionalNumber(z.number().int().positive()),
  bodyType: z.string().trim().optional(),
  doors: optionalNumber(z.number().int().positive()),
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
  yearManufacture: requiredNumber(
    z
      .number({ error: "Informe o ano de fabricação." })
      .int("Informe um ano inteiro.")
      .min(1900, "O ano deve ser igual ou posterior a 1900.")
      .max(2100, "O ano deve ser igual ou anterior a 2100."),
  ),
  yearModel: requiredNumber(
    z
      .number({ error: "Informe o ano do modelo." })
      .int("Informe um ano inteiro.")
      .min(1900, "O ano deve ser igual ou posterior a 1900.")
      .max(2100, "O ano deve ser igual ou anterior a 2100."),
  ),
  price: requiredWholeNumber(
    z.number({ error: "Informe o preço." }).positive("Informe o preço."),
  ),
  images: z.array(z.string()).min(1, "Adicione ao menos uma foto."),
});
export type VehiclePublishSchema = z.infer<typeof vehiclePublishSchema>;
