import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root = one level up from scripts/
const rootDir = path.resolve(__dirname, '..');
const dbDir = path.join(rootDir, 'db');
const buildDir = path.join(dbDir, 'build');

// Ensure build folder exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

const outputFile = path.join(buildDir, 'proteins_dataset.json');

// Function to parse a single .faa file
function parseFaaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const entries = [];
  const lines = content.split('\n');
  let currentEntry = null;

  lines.forEach((line) => {
    if (line.startsWith('>')) {
      if (currentEntry) {
        entries.push(currentEntry);
      }
      const header = line.slice(1).trim();
      const [accession, ...descParts] = header.split(' ');
      const description = descParts.join(' ');
      const organismMatch = description.match(/\[(.*?)\]$/);
      const organism = organismMatch ? organismMatch[1] : 'Unknown';
      const desc = organismMatch
        ? description.replace(/\s*\[.*?\]$/, '')
        : description;

      currentEntry = {
        accession,
        description: desc,
        organism,
        sequence: '',
      };
    } else if (line.trim()) {
      currentEntry.sequence += line.trim();
    }
  });

  // Push the last entry if exists
  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

// Main function to process all .faa files
function processFaaFiles() {
  const allEntries = [];

  const files = fs.readdirSync(dbDir);
  files.forEach((file) => {
    if (file.endsWith('.faa')) {
      const filePath = path.join(dbDir, file);
      const entries = parseFaaFile(filePath);
      allEntries.push(...entries);
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(allEntries, null, 2));
  console.log(`Parsed ${allEntries.length} protein entries into proteins_dataset.json`);
}

// Execute the processing
processFaaFiles();
