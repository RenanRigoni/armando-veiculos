/** Faixa Unicode dos acentos combinantes, separada da normalização NFD. */
const COMBINING_MARKS = /[̀-ͯ]/g;

/** Normaliza texto livre em slug de URL: minúsculas, sem acento, hifenizado. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

type SlugParts = {
  make?: string | null;
  model?: string | null;
  version?: string | null;
  yearModel?: number | null;
};

/** Slug sugerido a partir dos campos do veículo. Editável no formulário do admin. */
export function buildVehicleSlug({ make, model, version, yearModel }: SlugParts): string {
  return slugify([make, model, version, yearModel].filter(Boolean).join(" "));
}

/** Acrescenta sufixo numérico quando o slug já existe: "corolla-xei" -> "corolla-xei-2". */
export function withSlugSuffix(slug: string, attempt: number): string {
  return attempt <= 1 ? slug : `${slug}-${attempt}`;
}
