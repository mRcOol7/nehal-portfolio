const sharp = require('sharp');
const fs = require('fs');

async function generateOrangeVandeBharatAtlas() {
  const WIDTH = 1024;
  const HEIGHT = 1024;
  const ROW = 124;

  console.log('Generating authentic stretched Orange Vande Bharat Express texture atlas...');

  // Buffer for RGBA (1024 x 1024)
  const buffer = Buffer.alloc(WIDTH * HEIGHT * 4, 0);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return;
    const idx = (y * WIDTH + x) * 4;
    buffer[idx] = r;
    buffer[idx + 1] = g;
    buffer[idx + 2] = b;
    buffer[idx + 3] = a;
  }

  // --- Official Saffron & Stealth Grey Vande Bharat Palette ---
  const SAFFRON_MAIN = [255, 92, 0];       // #FF5C00 - High-visibility vibrant Saffron Orange
  const SAFFRON_LIGHT = [255, 136, 40];    // #FF8828 - Glossy aerodynamic highlight
  const SAFFRON_DEEP = [225, 70, 0];       // #E14600 - Rich dimensional underbody
  const STEALTH_GREY = [24, 28, 36];       // #181C24 - Matte graphite stealth
  const CHARCOAL_ROOF = [38, 43, 52];      // #262B34 - Aerodynamic roofline
  const TINTED_GLASS = [12, 16, 22];       // #0C1016 - Obsidian tinted panoramic glass
  const WHITE_STRIPE = [255, 255, 255];    // #FFFFFF - Razor-sharp speed pinstripe
  const WARM_CABIN = [255, 238, 140];      // #FFEE8C - Warm ambient cabin illumination
  const HEADLIGHT_LED = [255, 255, 255];   // #FFFFFF - 6500K Xenon LED projector beam
  const TAILLIGHT_RED = [245, 45, 45];     // #F52D2D - Vivid red marker LEDs

  // ==========================================
  // ROW 0: Driving Trailer Cab (DTC)
  // y: 0 to 123, x: 0 to 476
  // ==========================================
  function getLocoTopY(x) {
    if (x < 6) return 122;
    if (x < 24) return 114 - (x - 6) * 1.5;
    if (x < 50) return 88 - (x - 24) * 1.1;
    if (x < 85) return 60 - (x - 50) * 0.5;
    if (x < 115) return 42 - (x - 85) * 0.2;
    return 36; // Flat roof after cab
  }

  const LOCO_BOT_Y = 122;

  for (let x = 0; x < 476; x++) {
    const topY = Math.round(getLocoTopY(x));
    for (let y = topY; y <= LOCO_BOT_Y; y++) {
      let color = STEALTH_GREY;

      if (x < 115) {
        // Aerodynamic Nose Section
        if (y >= 118) {
          color = STEALTH_GREY; // bottom skirt
        } else if (y >= 106) {
          color = SAFFRON_DEEP; // lower nose wedge
        } else if (y >= 102 && x >= 35) {
          color = WHITE_STRIPE; // white nose accent
        } else if (y >= 74) {
          color = SAFFRON_MAIN; // mid nose
        } else if (y >= 48 && x >= 28) {
          color = TINTED_GLASS; // cockpit windscreen
          if (y === 56 || y === 57) color = [45, 60, 80];
        } else {
          color = SAFFRON_MAIN; // upper nose hood
        }
      } else {
        // Straight body section of DTC
        if (y < 44) {
          color = CHARCOAL_ROOF;
        } else if (y < 56) {
          color = SAFFRON_MAIN;
        } else if (y === 56 || y === 88) {
          color = WHITE_STRIPE;
        } else if (y > 56 && y < 88) {
          const winX = (x - 120) % 44;
          if (winX < 36) {
            color = TINTED_GLASS;
          } else {
            color = STEALTH_GREY;
          }
        } else if (y >= 89 && y < 114) {
          color = SAFFRON_MAIN;
          if (y === 102 || y === 103) {
            color = WHITE_STRIPE;
          }
        } else if (y >= 114 && y < 118) {
          color = SAFFRON_DEEP;
        } else {
          color = STEALTH_GREY;
        }
      }

      setPixel(x, y, color[0], color[1], color[2], 255);
    }
  }

  // FRONT TILE (x: 484 to 539, w: 55) - Front aerodynamic nose face
  for (let x = 484; x < 539; x++) {
    const rx = (x - 484) / 55;
    const distFromCenter = Math.abs(rx - 0.5) * 2;
    const topY = Math.round(36 + distFromCenter * 30);

    for (let y = topY; y <= 122; y++) {
      let color = SAFFRON_MAIN;
      if (y < 50) {
        color = CHARCOAL_ROOF;
      } else if (y >= 50 && y < 76 && distFromCenter < 0.8) {
        color = TINTED_GLASS;
      } else if (y >= 76 && y < 82) {
        color = WHITE_STRIPE;
      } else if (y >= 82 && y < 112) {
        color = SAFFRON_MAIN;
        if (y >= 88 && y <= 94 && (Math.abs(x - 495) <= 3 || Math.abs(x - 527) <= 3)) {
          color = [240, 245, 255]; // headlights
        }
      } else if (y >= 112) {
        color = STEALTH_GREY;
      }
      setPixel(x, y, color[0], color[1], color[2], 255);
    }
  }

  // END TILE (x: 544 to 599, w: 55) - Gangway vestibule
  for (let x = 544; x < 599; x++) {
    const distFromCenter = Math.abs((x - 544) / 55 - 0.5) * 2;
    const topY = 36;
    for (let y = topY; y <= 122; y++) {
      let color = STEALTH_GREY;
      if (distFromCenter < 0.6 && y > 46 && y < 116) {
        color = [20, 23, 28]; // rubber vestibule door
      } else {
        color = SAFFRON_MAIN;
      }
      setPixel(x, y, color[0], color[1], color[2], 255);
    }
  }

  // ==========================================
  // ROW 1: Intermediate Passenger Coach (Chair Car)
  // y: 124 to 247, x: 1 to 419
  // ==========================================
  const COACH_TOP_Y = 124 + 26;
  const COACH_EAVE_Y = 124 + 40;
  const COACH_BOT_Y = 124 + 120;

  for (let x = 1; x < 419; x++) {
    for (let y = COACH_TOP_Y; y <= COACH_BOT_Y; y++) {
      let color = SAFFRON_MAIN;

      if (y < COACH_EAVE_Y) {
        const roofT = (y - COACH_TOP_Y) / (COACH_EAVE_Y - COACH_TOP_Y);
        color = [
          Math.round(CHARCOAL_ROOF[0] * (0.8 + 0.4 * roofT)),
          Math.round(CHARCOAL_ROOF[1] * (0.8 + 0.4 * roofT)),
          Math.round(CHARCOAL_ROOF[2] * (0.8 + 0.4 * roofT))
        ];
      } else if (y < 124 + 54) {
        color = SAFFRON_MAIN;
      } else if (y === 124 + 54 || y === 124 + 86) {
        color = WHITE_STRIPE;
      } else if (y > 124 + 54 && y < 124 + 86) {
        const winX = x % 44;
        if (winX < 36) {
          color = TINTED_GLASS;
        } else {
          color = STEALTH_GREY;
        }
      } else if (y >= 124 + 87 && y < 124 + 112) {
        color = SAFFRON_MAIN;
        if (y === 124 + 100 || y === 124 + 101) {
          color = WHITE_STRIPE;
        }
      } else if (y >= 124 + 112 && y < 124 + 116) {
        color = SAFFRON_DEEP;
      } else {
        color = STEALTH_GREY;
      }

      setPixel(x, y, color[0], color[1], color[2], 255);
    }
  }

  // ==========================================
  // VECTOR OVERLAYS (Sharp SVG Compositing)
  // Stretched, bold, ultra-crisp Make In India Lion Badge, "वंदे भारत", Route Indicator, Coach Numbers
  // ==========================================
  
  // 1. DTC Locomotive Details (Row 0):
  // Stretched Make in India badge at x: 155 to 275 (120px wide!)
  const dtcOverlaySvg = `
  <svg width="476" height="124" viewBox="0 0 476 124" xmlns="http://www.w3.org/2000/svg">
    <!-- Driver Door (x: 122 to 148) -->
    <rect x="124" y="56" width="22" height="56" rx="2" fill="#181C24" stroke="#E2E8F0" stroke-width="1.2" />
    <rect x="127" y="60" width="16" height="24" rx="1" fill="#0C1016" stroke="#475569" stroke-width="0.8" />
    <line x1="144" y1="74" x2="144" y2="86" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" />
    <!-- Tiranga Indian Flag above driver door -->
    <g transform="translate(127, 49)">
      <rect x="0" y="0" width="16" height="1.8" fill="#FF9933" />
      <rect x="0" y="1.8" width="16" height="1.8" fill="#FFFFFF" />
      <rect x="0" y="3.6" width="16" height="1.8" fill="#138808" />
      <circle cx="8" cy="2.7" r="0.8" fill="#000080" />
    </g>

    <!-- "वंदे भारत EXPRESS" Curve (x: 65 to 118, y: 74 to 98) -->
    <g transform="translate(65, 74)">
      <path d="M 50,7 C 34,1 10,1 2,7 C 0,9 10,13 48,11" fill="none" stroke="#FFFFFF" stroke-width="1.4" />
      <text x="25" y="8" fill="#FFFFFF" font-size="6" font-family="'Arial Unicode MS', 'Noto Sans Devanagari', sans-serif" font-weight="900" letter-spacing="0.3">वंदे भारत</text>
      <text x="25" y="15" fill="#E2E8F0" font-size="4" font-family="Arial, sans-serif" font-weight="bold" letter-spacing="1.0">EXPRESS</text>
      <!-- Small Tiranga underline -->
      <line x1="2" y1="16" x2="12" y2="16" stroke="#FF9933" stroke-width="1.0" />
      <line x1="12" y1="16" x2="22" y2="16" stroke="#FFFFFF" stroke-width="1.0" />
      <line x1="22" y1="16" x2="32" y2="16" stroke="#138808" stroke-width="1.0" />
    </g>

    <!-- PROMINENT STRETCHED OFFICIAL MAKE IN INDIA BADGE (x: 152 to 276, y: 58 to 108) -->
    <g transform="translate(152, 58)">
      <!-- Scalloped Cloud Shield Outline -->
      <path d="M 22,25 
               C 10,16 16,3 36,6 
               C 48,0 78,0 90,6 
               C 110,3 116,16 104,25 
               C 116,34 110,48 90,45 
               C 78,51 48,51 36,45 
               C 16,48 10,34 22,25 Z"
            fill="#FFFFFF" stroke="#EA580C" stroke-width="2.0" />

      <!-- Cogwheel Gear Lion Silhouette -->
      <g fill="#181C24">
        <!-- Mane & Ears with Gear Teeth -->
        <path d="M 78,14 C 84,11 90,14 93,18 C 96,22 94,27 90,28 C 87,29 84,26 85,23 C 81,25 77,22 76,19 Z" />
        <circle cx="91" cy="15" r="2.2" />
        <circle cx="86" cy="12" r="1.8" />
        <circle cx="80" cy="13" r="1.8" />
        <!-- Jaw -->
        <path d="M 89,22 L 95,24 L 94,27 L 88,27 Z" />
        <!-- Cog-toothed Spine & Body -->
        <path d="M 40,19 C 50,16 68,16 80,18 L 80,28 C 70,30 50,30 40,26 Z" />
        <!-- Gear cogs -->
        <rect x="42" y="15" width="3.5" height="3.5" rx="0.5" />
        <rect x="49" y="15" width="3.5" height="3.5" rx="0.5" />
        <rect x="56" y="15" width="3.5" height="3.5" rx="0.5" />
        <rect x="63" y="15" width="3.5" height="3.5" rx="0.5" />
        <rect x="70" y="16" width="3.5" height="3.5" rx="0.5" />
        <!-- Powerful Striding Legs with Joint Cogs -->
        <path d="M 75,27 L 78,41 L 82,41 L 80,27 Z" />
        <circle cx="78" cy="34" r="1.8" fill="#FFFFFF" />
        <path d="M 68,27 L 71,42 L 75,42 L 72,27 Z" />
        <path d="M 47,24 L 44,41 L 48,41 L 51,25 Z" />
        <circle cx="47" cy="33" r="1.8" fill="#FFFFFF" />
        <path d="M 40,25 L 35,42 L 39,42 L 43,26 Z" />
        <!-- Curving Tail -->
        <path d="M 40,23 C 31,20 25,24 25,31 C 25,35 28,37 30,37 C 28,34 27,33 28,30 C 29,26 34,24 40,24 Z" />
      </g>

      <!-- Bold MAKE IN INDIA Box Badge -->
      <rect x="28" y="19" width="68" height="11" rx="1.8" fill="#FFFFFF" stroke="#181C24" stroke-width="1.3" />
      <text x="62" y="27.5" fill="#181C24" font-size="7.0" font-family="'Arial Black', Impact, Arial, sans-serif" font-weight="900" letter-spacing="0.8" text-anchor="middle">
        MAKE IN INDIA
      </text>

      <!-- Subtitle: Indian Railways -->
      <text x="62" y="45.5" fill="#C2410C" font-size="5.5" font-family="Arial, Helvetica, sans-serif" font-weight="bold" letter-spacing="0.6" text-anchor="middle">
        INDIAN RAILWAYS
      </text>
    </g>

    <!-- Stenciled Coach Number: DTC 1 (x: 282 to 326, y: 91 to 104) -->
    <rect x="282" y="91" width="44" height="13" rx="2" fill="#181C24" stroke="#FFFFFF" stroke-width="1.2" />
    <text x="304" y="100.8" fill="#FFFFFF" font-size="8.5" font-family="'Arial Black', Impact, Arial, sans-serif" font-weight="900" letter-spacing="1.0" text-anchor="middle">
      DTC 1
    </text>

    <!-- Large Digital Amber LED Route Indicator on DTC (x: 334 to 466, y: 42 to 54) -->
    <rect x="334" y="42" width="132" height="12" rx="2" fill="#0A0D12" stroke="#475569" stroke-width="1.0" />
    <text x="400" y="51.2" fill="#FF9E0B" font-size="8.0" font-family="'Courier New', Courier, monospace" font-weight="900" letter-spacing="1.5" text-anchor="middle">
      NDLS ⇌ SVDK
    </text>
    <circle cx="341" cy="48" r="1.6" fill="#22C55E" />
    <circle cx="459" cy="48" r="1.6" fill="#22C55E" />
  </svg>`;

  // 2. Intermediate Passenger Coach Details (Row 1):
  // Stretched PIDS and larger coach numbers
  const coachOverlaySvg = `
  <svg width="419" height="124" viewBox="0 0 419 124" xmlns="http://www.w3.org/2000/svg">
    <!-- Front Door (x: 10 to 36) -->
    <rect x="10" y="56" width="26" height="56" rx="2" fill="#181C24" stroke="#E2E8F0" stroke-width="1.2" />
    <rect x="15" y="60" width="16" height="24" rx="1" fill="#0C1016" stroke="#475569" stroke-width="0.8" />
    <line x1="10" y1="84" x2="36" y2="84" stroke="#FBBF24" stroke-width="1.4" />

    <!-- Rear Door (x: 382 to 408) -->
    <rect x="382" y="56" width="26" height="56" rx="2" fill="#181C24" stroke="#E2E8F0" stroke-width="1.2" />
    <rect x="387" y="60" width="16" height="24" rx="1" fill="#0C1016" stroke="#475569" stroke-width="0.8" />
    <line x1="382" y1="84" x2="408" y2="84" stroke="#FBBF24" stroke-width="1.4" />

    <!-- Coach Number C1 (Front end, bold & large) -->
    <rect x="42" y="91" width="30" height="13" rx="2" fill="#181C24" stroke="#FFFFFF" stroke-width="1.2" />
    <text x="57" y="100.8" fill="#FFFFFF" font-size="8.5" font-family="'Arial Black', Impact, Arial, sans-serif" font-weight="900" letter-spacing="1.0" text-anchor="middle">
      C1
    </text>

    <!-- Coach Number C1 (Rear end, bold & large) -->
    <rect x="347" y="91" width="30" height="13" rx="2" fill="#181C24" stroke="#FFFFFF" stroke-width="1.2" />
    <text x="362" y="100.8" fill="#FFFFFF" font-size="8.5" font-family="'Arial Black', Impact, Arial, sans-serif" font-weight="900" letter-spacing="1.0" text-anchor="middle">
      C1
    </text>

    <!-- Prominent Stretched Digital Amber LED Route Display (PIDS) -->
    <rect x="120" y="41" width="180" height="13" rx="2" fill="#0A0D12" stroke="#475569" stroke-width="1.0" />
    <text x="210" y="50.8" fill="#FF9E0B" font-size="8.5" font-family="'Courier New', Courier, monospace" font-weight="900" letter-spacing="1.8" text-anchor="middle">
      NDLS ⇌ SVDK
    </text>
    <circle cx="128" cy="47.5" r="1.8" fill="#22C55E" />
    <circle cx="292" cy="47.5" r="1.8" fill="#22C55E" />

    <!-- Aerodynamic Saffron Hazard / Speed cuts above windows -->
    <g fill="#EA580C" opacity="0.9">
      <polygon points="76,43 83,43 79,52 72,52" />
      <polygon points="87,43 94,43 90,52 83,52" />
      <polygon points="98,43 105,43 101,52 94,52" />
      <polygon points="314,43 321,43 317,52 310,52" />
      <polygon points="325,43 332,43 328,52 321,52" />
      <polygon points="336,43 343,43 339,52 332,52" />
    </g>
  </svg>`;

  // Render SVG overlays to PNG buffers
  const dtcOverlayBuf = await sharp(Buffer.from(dtcOverlaySvg)).png().toBuffer();
  const coachOverlayBuf = await sharp(Buffer.from(coachOverlaySvg)).png().toBuffer();

  // Composite SVG overlays onto base buffer
  const baseSharp = sharp(buffer, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } });
  const compositedBuffer = await baseSharp
    .composite([
      { input: dtcOverlayBuf, left: 0, top: 0 },
      { input: coachOverlayBuf, left: 0, top: 124 },
    ])
    .raw()
    .toBuffer();

  compositedBuffer.copy(buffer);

  // ==========================================
  // ROW 2: Night Illuminated Layer
  // y: 248 to 371
  // ==========================================

  // 1. Passenger Coach illuminated windows & glowing PIDS (cx: 1 to 419, offset by +484)
  for (let cx = 1; cx < 419; cx++) {
    const x = cx + 484;
    if (x >= WIDTH) continue;
    const winX = cx % 44;
    for (let cy = 56; cy < 85; cy++) {
      const y = 248 + cy;
      if (winX < 36 && cx > 40 && cx < 380) {
        const edgeDist = Math.min(winX, 35 - winX, cy - 56, 84 - cy);
        const glow = Math.min(1.0, 0.4 + edgeDist * 0.2);
        setPixel(x, y, 
          Math.round(WARM_CABIN[0] * glow),
          Math.round(WARM_CABIN[1] * glow),
          Math.round(WARM_CABIN[2] * glow),
          255
        );
      }
    }
    // Glowing Amber LED Route Display (PIDS)
    if (cx >= 120 && cx <= 300) {
      for (let cy = 41; cy <= 54; cy++) {
        const y = 248 + cy;
        setPixel(x, y, 255, 158, 11, 245);
      }
    }
  }

  // 2. Front Cab Driving Trailer Coach illuminated windows & PIDS
  for (let x = 120; x < 460; x++) {
    const winX = (x - 120) % 44;
    if (winX < 36 && x > 280) {
      for (let y = 248 + 58; y < 248 + 86; y++) {
        setPixel(x, y, WARM_CABIN[0], WARM_CABIN[1], WARM_CABIN[2], 255);
      }
    }
    // DTC Amber route display
    if (x >= 334 && x <= 466) {
      for (let y = 248 + 42; y <= 248 + 54; y++) {
        setPixel(x, y, 255, 158, 11, 245);
      }
    }
  }

  // Cockpit instruments
  for (let x = 55; x < 95; x++) {
    for (let y = 248 + 65; y < 248 + 75; y++) {
      setPixel(x, y, 100, 240, 200, 200);
    }
  }

  // 3. Front Nose Projector LED Headlights
  for (let fx = 484; fx < 539; fx++) {
    const lx = fx - 484 + 910;
    if (lx >= WIDTH) continue;
    for (let fy = 0; fy < 124; fy++) {
      const ly = 248 + fy;
      const d1 = Math.hypot(fx - 495, fy - 91);
      const d2 = Math.hypot(fx - 527, fy - 91);
      if (d1 < 5 || d2 < 5) {
        setPixel(lx, ly, HEADLIGHT_LED[0], HEADLIGHT_LED[1], HEADLIGHT_LED[2], 255);
      } else if (d1 < 9 || d2 < 9) {
        setPixel(lx, ly, 220, 240, 255, 180);
      }
    }
  }

  // 4. End coach red marker tail lights
  for (let ex = 544; ex < 599; ex++) {
    const lx = ex - 544 + 968;
    if (lx >= WIDTH) continue;
    for (let ey = 0; ey < 124; ey++) {
      const ly = 248 + ey;
      const d1 = Math.hypot(ex - 552, ey - 95);
      const d2 = Math.hypot(ex - 591, ey - 95);
      if (d1 < 4 || d2 < 4) {
        setPixel(lx, ly, TAILLIGHT_RED[0], TAILLIGHT_RED[1], TAILLIGHT_RED[2], 255);
      }
    }
  }

  // ==========================================
  // ROW 3: Night Bloom Halo
  // y: 372 to 495
  // ==========================================
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < ROW; y++) {
      const r2Idx = ((248 + y) * WIDTH + x) * 4;
      const r2A = buffer[r2Idx + 3];
      if (r2A > 100) {
        const r = buffer[r2Idx], g = buffer[r2Idx + 1], b = buffer[r2Idx + 2];
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const bx = x + dx;
            const by = 372 + y + dy;
            if (bx >= 0 && bx < WIDTH && by >= 372 && by < 496) {
              const bIdx = (by * WIDTH + bx) * 4;
              const dist = Math.hypot(dx, dy);
              const factor = Math.max(0, 1 - dist / 4.5) * 0.45;
              buffer[bIdx] = Math.max(buffer[bIdx], Math.round(r * factor));
              buffer[bIdx + 1] = Math.max(buffer[bIdx + 1], Math.round(g * factor));
              buffer[bIdx + 2] = Math.max(buffer[bIdx + 2], Math.round(b * factor));
              buffer[bIdx + 3] = Math.max(buffer[bIdx + 3], Math.round(255 * factor));
            }
          }
        }
      }
    }
  }

  // ==========================================
  // ROW 4: Smooth Row
  // y: 496 to 619
  // ==========================================
  for (let x = 0; x < 476; x++) {
    const topY = Math.round(getLocoTopY(x));
    for (let y = topY; y <= LOCO_BOT_Y; y++) {
      const r0Idx = (y * WIDTH + x) * 4;
      const r4Y = 496 + y;
      const r4Idx = (r4Y * WIDTH + x) * 4;
      buffer[r4Idx] = Math.round(buffer[r0Idx] * 0.92);
      buffer[r4Idx + 1] = Math.round(buffer[r0Idx + 1] * 0.92);
      buffer[r4Idx + 2] = Math.round(buffer[r0Idx + 2] * 0.92);
      buffer[r4Idx + 3] = buffer[r0Idx + 3];
    }
  }

  // Save to public/footer/train.webp
  await sharp(buffer, {
    raw: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4
    }
  })
    .webp({ quality: 96, effort: 6 })
    .toFile('public/footer/train.webp');

  console.log('Successfully generated stretched train atlas with ultra-prominent Make In India logo!');
}

generateOrangeVandeBharatAtlas().catch(err => {
  console.error('Error generating train atlas:', err);
  process.exit(1);
});
