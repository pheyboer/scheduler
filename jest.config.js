export default {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/serviceWorker.js",
    "!src/**/*.test.{js,jsx}"
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ]
};
