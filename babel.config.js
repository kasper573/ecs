module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    //presets: ["@babel/preset-env", "@babel/preset-react"],
    presets: [
      ["react-app", { flow: false, typescript: true, runtime: "automatic" }],
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(api.env("development") && { plugins: ["react-refresh/babel"] }),
  };
};
