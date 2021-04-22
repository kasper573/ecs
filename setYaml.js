const fs = require("fs");
const yaml = require("yaml");

const inputFilename = process.argv[2];
const outputFilename = inputFilename;
const path = process.argv[3];
const value = process.argv[4];

if (!inputFilename) {
  console.log("input filename missing");
  process.exit();
}
if (!outputFilename) {
  console.log("output filename missing");
  process.exit();
}
if (!path) {
  console.log("path missing");
  process.exit();
}
if (!value) {
  console.log("value missing");
  process.exit();
}

const composeFile = fs.readFileSync(inputFilename, "utf-8");
const doc = yaml.parseDocument(composeFile, {});
doc.setIn(path.split("."), value);
fs.writeFileSync(outputFilename, doc.toString(), "utf-8");
