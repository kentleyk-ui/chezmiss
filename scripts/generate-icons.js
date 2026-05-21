#!/usr/bin/env node

/**
 * Generate app icons from SVG
 * Usage: node scripts/generate-icons.js
 *
 * Requirements:
 * - sharp: npm install sharp
 * - Ensure favicon.svg exists in public/
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [96, 144, 150, 192, 512];
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

console.log('🎨 Generating app icons from favicon.svg...\n');

// Check if SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('❌ Error: favicon.svg not found in public/');
  process.exit(1);
}

// Generate each size
Promise.all(
  sizes.map(async (size) => {
    const outputPath = path.join(publicDir, `logo-heart-${size}.png`);

    try {
      await sharp(svgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 8, g: 5, b: 8, alpha: 1 } // #080508
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: logo-heart-${size}.png`);
    } catch (err) {
      console.error(`❌ Error generating ${size}x${size}:`, err.message);
    }
  })
).then(() => {
  console.log('\n✨ All icons generated successfully!');
  console.log('📁 Check: public/logo-heart-*.png');
}).catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
