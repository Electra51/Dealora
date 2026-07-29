import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = '/home/safayet/best-dealz/src/assets';
const categoriesDir = path.join(assetsDir, 'images/categories');
const imagesDir = path.join(assetsDir, 'images');

const resizeTasks = [
  { file: path.join(categoriesDir, 'accessesories.webp'), width: 146, height: 146 },
  { file: path.join(categoriesDir, 'clothing.webp'), width: 146, height: 146 },
  { file: path.join(categoriesDir, 'footwaer.webp'), width: 128, height: 128 },
  { file: path.join(categoriesDir, 'grooming.webp'), width: 128, height: 128 },
  { file: path.join(imagesDir, 'logo-mobile.webp'), width: 114, height: 52 },
  { file: path.join(imagesDir, 'Logo.webp'), width: 308, height: 138 },
];

async function resizeImages() {
  for (const task of resizeTasks) {
    if (fs.existsSync(task.file)) {
      console.log(`Resizing ${task.file} to ${task.width}x${task.height}`);
      const buffer = await sharp(task.file)
        .resize({ width: task.width, height: task.height, fit: 'inside' })
        .toBuffer();
      fs.writeFileSync(task.file, buffer);
      console.log(`Successfully resized ${task.file}`);
    } else {
      console.log(`File not found: ${task.file}`);
    }
  }
}

async function handleShoe() {
  const shoeFile = path.join(assetsDir, 'shoe.webp');
  const shoeMobileFile = path.join(assetsDir, 'shoe-mobile.webp');
  
  if (fs.existsSync(shoeFile)) {
    console.log(`Generating mobile version of shoe.webp`);
    const buffer = await sharp(shoeFile)
      .resize({ width: 250, height: 250, fit: 'inside' })
      .toBuffer();
    fs.writeFileSync(shoeMobileFile, buffer);
    console.log(`Successfully created ${shoeMobileFile}`);
  }
}

async function main() {
  await resizeImages();
  await handleShoe();
}

main().catch(console.error);
