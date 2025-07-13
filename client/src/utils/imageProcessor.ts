export function removeBackground(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Dibujar imagen original
      ctx?.drawImage(img, 0, 0);
      
      if (!ctx) {
        resolve(imageUrl);
        return;
      }
      
      // Obtener datos de imagen
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Hacer transparente el fondo blanco/gris claro
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Si el pixel es muy claro (fondo), hacerlo transparente
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Alpha = 0 (transparente)
        }
      }
      
      // Aplicar cambios
      ctx.putImageData(imageData, 0, 0);
      
      // Convertir a data URL
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };
    
    img.src = imageUrl;
  });
}