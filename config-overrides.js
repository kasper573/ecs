const rewireStyledComponents = require("react-app-rewire-styled-components");

module.exports = function (config, env) {
  // REACT_APP_ENTRY is set via CLI in package.json scripts
  config.entry = `./src/entry/${process.env.REACT_APP_ENTRY}.tsx`;
  config = rewireStyledComponents(config, env);
  return config;
};
