// Genera los PNG de la PWA desde public/icons/logo.svg y logo-maskable.svg: npm run icons
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');
const logo = path.join(dir, 'logo.svg');
// El maskable deja el dibujo dentro de la zona segura (círculo del 80%) y sin esquinas redondeadas
const maskable = path.join(dir, 'logo-maskable.svg');

const icons = [
  { svg: logo, size: 32, name: 'favicon-32.png' },
  { svg: logo, size: 192, name: 'icon-192.png' },
  { svg: logo, size: 512, name: 'icon-512.png' },
  { svg: maskable, size: 180, name: 'apple-touch-icon.png' },
  { svg: maskable, size: 192, name: 'icon-maskable-192.png' },
  { svg: maskable, size: 512, name: 'icon-maskable-512.png' },
];

for (const { svg, size, name } of icons) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(path.join(dir, name));
  console.log(`✓ public/icons/${name}`);
}
