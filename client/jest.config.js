module.exports = {
  bail: true,
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["<rootDir>/src/**/?(*.)test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
};
