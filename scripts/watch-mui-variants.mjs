import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const repoRoot = process.cwd();
const themePath = path.join(repoRoot, 'src', 'theme', 'theme.ts');

let timer = null;
let running = false;

const runUpdate = () => {
  if (running) {
    return;
  }
  running = true;
  const child = spawn(process.execPath, ['scripts/update-mui-variants.mjs'], {
    stdio: 'inherit',
  });
  child.on('exit', () => {
    running = false;
  });
};

fs.watch(themePath, { persistent: true }, () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(runUpdate, 150);
});

console.log('Watching src/theme/theme.ts for changes...');
runUpdate();
