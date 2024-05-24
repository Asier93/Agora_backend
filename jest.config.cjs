module.exports = {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  testTimeout: 40000,
};
