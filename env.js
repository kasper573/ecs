const fs = require("fs");
const path = require("path");
const { config } = require("dotenv");

// Load environment variables from .env or .env.example
// (This file is used by both webpack and node)
module.exports = {
  loadEnv,
  selectEnv,
};

function loadEnv(root) {
  const selected = selectEnv(root);
  console.log("Using env: " + selected);
  config({ path: selected });
}

function selectEnv(root) {
  const primary = path.join(root, ".env");
  const secondary = path.join(root, ".env.builtin");
  return fs.existsSync(primary) ? primary : secondary;
}
