const path = require("path");
const { config } = require("dotenv");

// Adds variables in <projectDir>/.env to current process.env
config({ path: path.resolve(__dirname, "../.env") });
