const fs = require("fs");
const yaml = require("yaml");
const { Pair } = require("yaml/types");

const { inputFilename, outputFilename, anchorName, anchorValue } = getParams();
const composeFile = fs.readFileSync(inputFilename, "utf-8");
const doc = yaml.parseDocument(composeFile, {});
setAnchorValue(doc, anchorName, anchorValue);
fs.writeFileSync(outputFilename, doc.toString(), "utf-8");

function setAnchorValue(doc, anchorName, anchorValue) {
  const apiNode = doc.anchors.getNode(anchorName);
  if (!apiNode) {
    console.log("Could not find anchor by name", anchorName);
    process.exit();
  }
  const newItems = [];
  for (const key in anchorValue) {
    newItems.push(new Pair(key, anchorValue[key]));
  }
  apiNode.items = newItems;
}

function getParams() {
  const inputFilename = process.argv[2];
  const outputFilename = inputFilename;
  const anchorName = process.argv[3];

  if (!inputFilename) {
    console.log("input filename missing");
    process.exit();
  }
  if (!outputFilename) {
    console.log("output filename missing");
    process.exit();
  }
  if (!anchorName) {
    console.log("anchor name missing");
    process.exit();
  }
  const anchorValue = convertArgsIntoJSON(process.argv.slice(4));
  if (Object.keys(anchorValue).length === 0) {
    console.log(
      "At least one key value pair must be specified for anchor value"
    );
    process.exit();
  }

  return {
    inputFilename,
    outputFilename,
    anchorName,
    anchorValue,
  };
}

function convertArgsIntoJSON(args) {
  const values = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    values[key] = value;
  }
  return values;
}
