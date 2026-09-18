// Run with: npm run add-publication
// This script asks a few questions in the terminal, then automatically
// writes a new entry to data/publications.json. No code editing needed.

import { createInterface } from "readline/promises";
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

const root = process.cwd();
const pdfDir = path.join(root, "data", "pdfs");
const dataFile = path.join(root, "data", "publications.json");

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => rl.question(q);

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log("\n== Add New Publication ==\n");

  const allFiles = await readdir(pdfDir);
  const pdfFiles = allFiles.filter((f) => f.toLowerCase().endsWith(".pdf"));

  if (pdfFiles.length === 0) {
    console.log(
      "No PDF files found in data/pdfs/. Drag your PDF into that folder first (via File Explorer/Finder, or the file panel in VS Code), then run this command again.\n"
    );
    rl.close();
    return;
  }

  console.log("PDFs found in data/pdfs/:");
  pdfFiles.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  const choice = await ask("\nPick a number for this publication's PDF: ");
  const file = pdfFiles[parseInt(choice, 10) - 1];
  if (!file) {
    console.log("Invalid number. Try again.\n");
    rl.close();
    return;
  }

  const title = await ask("Publication title: ");
  const date = await ask("Year/date (e.g. 2026): ");
  const category = await ask("Category (e.g. Policy Paper, Thesis): ");
  const summary = await ask("Short summary (1-2 sentences): ");

  let slug = slugify(title);
  const raw = await readFile(dataFile, "utf-8");
  const publications = JSON.parse(raw);

  let finalSlug = slug;
  let n = 2;
  while (publications.some((p) => p.slug === finalSlug)) {
    finalSlug = `${slug}-${n}`;
    n++;
  }

  publications.push({
    slug: finalSlug,
    title,
    date,
    category,
    summary,
    file,
  });

  await writeFile(dataFile, JSON.stringify(publications, null, 2) + "\n");

  console.log(
    `\nDone! "${title}" has been added. If the dev server (npm run dev) is still running, just refresh the browser.\n`
  );
  rl.close();
}

main().catch((err) => {
  console.error("Something went wrong:", err.message);
  rl.close();
});
