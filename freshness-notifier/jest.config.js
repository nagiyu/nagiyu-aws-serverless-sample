const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@freshness-notifier/(.*)$": "<rootDir>/$1",
    "^@common/(.*)$": "<rootDir>/../common/$1",
  }
};