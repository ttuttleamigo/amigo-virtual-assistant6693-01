
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read current package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add widget build scripts
packageJson.scripts = {
  ...packageJson.scripts,
  'build:widget': 'vite build --config vite.widget.config.ts',
  'build:all': 'npm run build && npm run build:widget',
  'preview:widget': 'vite preview --config vite.widget.config.ts'
};

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Widget build scripts added to package.json');
console.log('You can now run:');
console.log('  npm run build:widget  - Build embeddable widget');
console.log('  npm run build:all     - Build both app and widget');
console.log('  npm run preview:widget - Preview widget build');
