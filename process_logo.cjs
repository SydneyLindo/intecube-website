const Jimp = require('jimp');

(async () => {
  const image = await Jimp.read('C:/Users/Lindo/.gemini/antigravity/brain/9ee9d0c7-3af2-4e0f-9e83-dc2385ed5784/media__1775438624870.jpg');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    const brightness = (r + g + b) / 3;
    
    this.bitmap.data[idx + 0] = 15; // Set red to 15 (#0F)
    this.bitmap.data[idx + 1] = 23; // Set green to 23 (#17)
    this.bitmap.data[idx + 2] = 42; // Set blue to 42 (#2A)
    this.bitmap.data[idx + 3] = brightness; // Set alpha to original brightness
  });
  
  image.autocrop();

  await image.writeAsync('c:/Users/Lindo/Downloads/intecube-website-main/intecube-website/public/logo.png');
  console.log('Logo processing completed successfully.');
})();
