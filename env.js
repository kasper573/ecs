const fs = require("fs");
const path = require("path");
const { config } = require("dotenv");

// Load environment variables from .env or .env.example
// (This file is used by both webpack and node)
module.exports = (root) => {
  const primary = path.join(root, ".env");
  const secondary = path.join(root, ".env.builtin");
  const selected = fs.existsSync(primary) ? primary : secondary;
  console.log("Using env: " + selected);
  config({ path: selected });
};
