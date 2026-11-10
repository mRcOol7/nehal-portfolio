const sharp = require('sharp');
const path = require('path');

async function generateZoomedPlates() {
  const source = 'C:/Users/HP/.gemini/antigravity/brain/56cecb79-6c96-4a49-a2f0-3359e45bdf92/chenab_bridge_hd.jpg';

  // Zoomed crop: 1280x720 centered on bridge arch and deck
  // In source (1600 x 1066):
  // left: 160, top: 220, width: 1280, height: 720
  const crop = { left: 160, top: 220, width: 1280, height: 720 };

  console.log('Generating high-res zoomed Day plate...');
  await sharp(source)
    .extract(crop)
    .resize(1920, 1080, { kernel: sharp.kernel.lanczos3 })
    .modulate({
      brightness: 1.05,
      saturation: 1.15,
    })
    .webp({ quality: 92, effort: 6 })
    .toFile('public/footer/chenab-day.webp');

  console.log('Generating high-res zoomed Dusk plate...');
  // Dusk/night plate: deep twilight navy/indigo color grading matching the dark portfolio aesthetic
  const duskBuffer = await sharp(source)
    .extract(crop)
    .resize(1920, 1080, { kernel: sharp.kernel.lanczos3 })
    .modulate({
      brightness: 0.72,
      saturation: 0.90,
    })
    .tint({ r: 35, g: 50, b: 110 })
    .webp({ quality: 92, effort: 6 })
    .toFile('public/footer/chenab-dusk.webp');

  console.log('Both zoomed Chenab Rail Bridge plates successfully generated in public/footer/!');
}

generateZoomedPlates().catch(err => {
  console.error('Error generating zoomed plates:', err);
  process.exit(1);
});

