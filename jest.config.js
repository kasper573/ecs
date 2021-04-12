module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/packages/**/*.{js,jsx,ts,tsx}",
    "!src/packages/example-game/**",
    "!<rootDir>/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text"],
};
