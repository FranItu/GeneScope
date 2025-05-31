const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "..", "data", "sample_data");
const outputDir = path.join(__dirname, "..", "data", "sample_claims");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir).filter(file => file.endsWith(".faa"));

files.forEach((file, index) => {
  const filePath = path.join(inputDir, file);
  const content = fs.readFileSync(filePath, "utf-8").split("\n");

  const header = content.find(line => line.startsWith(">")) || ">UNKNOWN_PROTEIN";
  const sequence = content.filter(line => !line.startsWith(">")).join("").trim();

  const organism = file.replace(".faa", "").replace(/_/g, " ");
  const geneMatch = header.match(/\|([A-Z0-9_]+)\|([A-Z0-9_]+)/);
  const gene = geneMatch?.[2] || header.replace(">", "").split(" ")[0];

  const json = {
    gene,
    organism,
    sequence,
    tags: [organism, gene, "protein"],
    ontology: ["GO:0003674"], // placeholder
    scope: 1,
    validUntil: "2026-01-01",
    submitter: "FASTA-Upload"
  };

  const outputPath = path.join(outputDir, `claim_${index + 1}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
  console.log(`✅ Created ${outputPath}`);
});
