const sharp = require('sharp');

async function generateIndianDayPlate() {
  const source = 'C:/Users/HP/.gemini/antigravity/brain/56cecb79-6c96-4a49-a2f0-3359e45bdf92/chenab_bridge_hd.jpg';
  // Focused zoom on Chenab Rail Bridge arch and deck
  const crop = { left: 160, top: 220, width: 1280, height: 720 };

  console.log('Generating vibrant authentic Indian sunny daylight Chenab Rail Bridge plate...');

  // Natural bright Indian Himalayan daytime weather:
  // Sunlit mountain slopes, rich emerald valleys, terracotta rock cuts, clear blue mountain sky, and crisp steel arch
  await sharp(source)
    .extract(crop)
    .resize(1920, 1080, { kernel: sharp.kernel.lanczos3 })
    .modulate({
      brightness: 1.12,    // bright sunny mountain daylight
      saturation: 1.30,    // rich green valleys, terracotta soil, and blue sky
    })
    .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
    .webp({ quality: 96, effort: 6 })
    .toFile('public/footer/chenab-day.webp');

  // Also update dusk plate to match so there is zero dark tint even if queried
  await sharp('public/footer/chenab-day.webp')
    .toFile('public/footer/chenab-dusk.webp');

  console.log('Successfully generated public/footer/chenab-day.webp and chenab-dusk.webp with authentic Indian Himalayan sunny weather!');
}

generateIndianDayPlate().catch(err => {
  console.error('Error generating daylight plate:', err);
  process.exit(1);
});
