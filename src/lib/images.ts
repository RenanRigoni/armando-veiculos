export const VEHICLE_BUCKET = "vehicle-images";
export const PLACEHOLDER_IMAGE = "/placeholder-vehicle.svg";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB antes da compressão
const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 0.82;
const STORAGE_PATH_PREFIX = `/storage/v1/object/public/${VEHICLE_BUCKET}/`;

function getTrustedStorageOrigin(): URL | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;

  try {
    const url = new URL(base);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url;
  } catch {
    return null;
  }
}

function isTrustedStorageUrl(path: string, storageOrigin: URL): boolean {
  try {
    const url = new URL(path);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.origin === storageOrigin.origin &&
      url.pathname.startsWith(STORAGE_PATH_PREFIX)
    );
  } catch {
    return false;
  }
}

/**
 * Converte o caminho salvo no banco em URL exibível.
 * Aceita URL absoluta confiável do bucket, o placeholder local e caminhos
 * internos do bucket do Supabase Storage.
 */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return PLACEHOLDER_IMAGE;

  const storageOrigin = getTrustedStorageOrigin();
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return storageOrigin && isTrustedStorageUrl(path, storageOrigin)
      ? path
      : PLACEHOLDER_IMAGE;
  }

  if (path.startsWith("/")) {
    return path === PLACEHOLDER_IMAGE ? path : PLACEHOLDER_IMAGE;
  }

  if (!storageOrigin || /[?#\\]/.test(path)) return PLACEHOLDER_IMAGE;

  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    return PLACEHOLDER_IMAGE;
  }

  const encodedPath = segments.map(encodeURIComponent).join("/");
  return `${storageOrigin.origin}${STORAGE_PATH_PREFIX}${encodedPath}`;
}

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Formato não aceito. Use JPG, PNG ou WebP.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Arquivo muito grande. O limite é 15 MB.";
  }
  return null;
}

/**
 * Redimensiona e converte para WebP no navegador antes do upload.
 * Roda só no cliente — depende de canvas.
 */
export async function compressToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Não foi possível processar a imagem neste navegador.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY);
  });

  if (!blob) throw new Error("Falha ao converter a imagem.");
  return blob;
}

/** Caminho do arquivo dentro do bucket: "{vehicleId}/{uuid}.webp". */
export function buildStoragePath(vehicleId: string): string {
  return `${vehicleId}/${crypto.randomUUID()}.webp`;
}
