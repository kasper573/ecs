module.exports = function (config) {
  // REACT_APP_ENTRY is set via CLI in package.json scripts
  config.entry = `./src/entry/${process.env.REACT_APP_ENTRY}.tsx`;
  return config;
};
