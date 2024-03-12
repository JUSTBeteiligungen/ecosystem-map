import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.resolve();

async function build() {
  const buildFolder = path.join(__dirname, 'dist');
  if (!fs.existsSync(buildFolder)) {
    await fs.promises.mkdir(buildFolder);
  }

  fs.promises.cp(
    path.join(__dirname, 'public'),
    buildFolder,
    { recursive: true }
  );

  await esbuild.build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["src/index.tsx"],
    outfile: "dist/app.js",
    loader: { '.wav': 'file' },
    minify: true,
    format: 'esm',
    sourcemap: false,
  })
}

build();