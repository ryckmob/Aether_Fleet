const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.renameSync(outDir, distDir);

console.log("Build movido de out para dist com sucesso");
