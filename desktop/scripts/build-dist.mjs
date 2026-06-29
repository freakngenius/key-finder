// Copies the live web app (../app.html) into desktop/dist/index.html so the
// Tauri build always wraps the current app. Path-independent of cwd.
import { mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url)); // desktop/scripts
const desktop = join(here, '..');                     // desktop
const repoRoot = join(desktop, '..');                 // repo root

mkdirSync(join(desktop, 'dist'), { recursive: true });
copyFileSync(join(repoRoot, 'app.html'), join(desktop, 'dist', 'index.html'));
console.log('Copied app.html -> desktop/dist/index.html');
