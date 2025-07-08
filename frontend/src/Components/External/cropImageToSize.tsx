export const cropImageToSize = (
  file: File,
  width = 200,
  height = 200,
  quality = 0.6
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas not supported");

      // Crop center
      const scale = Math.min(img.width / width, img.height / height);
      const cropWidth = width * scale;
      const cropHeight = height * scale;
      const offsetX = (img.width - cropWidth) / 2;
      const offsetY = (img.height - cropHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Failed to convert canvas to blob");
          const compressedFile = new File([blob], file.name, { type: file.type });
          URL.revokeObjectURL(url);
          resolve(compressedFile);
        },
        file.type === "image/jpeg" ? "image/jpeg" : "image/png",
        quality
      );
    };

    img.onerror = reject;
  });
};
