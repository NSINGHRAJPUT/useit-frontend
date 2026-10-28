const MAX_EDGE = 1200;
const JPEG_QUALITY = 0.82;

export type CompressedImage = {
  src: string;
  width: number;
  height: number;
};

/** Read a File/Blob, downscale if needed, and return a JPEG data URL. */
export async function compressImageFile(file: Blob): Promise<CompressedImage> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not compress image.");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const src = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    return { src, width, height };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function isImageFile(file: File | Blob): boolean {
  return file.type.startsWith("image/");
}
