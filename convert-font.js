const fs = require("fs");

const fontPath = "./BarlowSemiCondensed-Bold.ttf"; // Update path if needed
const outputFile = "./BarlowSemiCondensed-Bold.txt"; // Output file

fs.readFile(fontPath, (err, data) => {
  if (err) {
    console.error("Error reading font file:", err);
    return;
  }

  const base64 = data.toString("base64");
  fs.writeFileSync(outputFile, `export default "data:font/ttf;base64,${base64}";`);
});
