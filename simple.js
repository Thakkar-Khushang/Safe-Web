// Generate a random key for the XOR encryption
const key = Math.floor(Math.random() * 256);

const encrypt = async (imageString) => {
  const image = await Jimp.read(Buffer.from(imageString, 'base64'));
   // Get the image dimensions
   const width = image.bitmap.width;
   const height = image.bitmap.height;

   // Encrypt the image using XOR
   for (let x = 0; x < width; x++) {
     for (let y = 0; y < height; y++) {
       const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
       const r = pixel.r ^ key;
       const g = pixel.g ^ key;
       const b = pixel.b ^ key;
       const color = Jimp.rgbaToInt(r, g, b, pixel.a);
       image.setPixelColor(color, x, y);
     }
   }

   // Shuffle the pixels
   for (let i = 0; i < 1000; i++) {
     const x1 = Math.floor(Math.random() * width);
     const y1 = Math.floor(Math.random() * height);
     const x2 = Math.floor(Math.random() * width);
     const y2 = Math.floor(Math.random() * height);
     const pixel1 = image.getPixelColor(x1, y1);
     const pixel2 = image.getPixelColor(x2, y2);
     image.setPixelColor(pixel2, x1, y1);
     image.setPixelColor(pixel1, x2, y2);
   }

   // Save the encrypted image as a PNG file
   // image.write('encrypted.png');
   // convert back into base64
   const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  return base64;
}

const decrypt = async (imageString) => {
  const image = await Jimp.read(Buffer.from(imageString, 'base64'));

  // Get the image dimensions
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  // Decrypt the image using XOR
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
      const r = pixel.r ^ key;
      const g = pixel.g ^ key;
      const b = pixel.b ^ key;
      const color = Jimp.rgbaToInt(r, g, b, pixel.a);
      image.setPixelColor(color, x, y);
    }
  }

  const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  return base64;
}