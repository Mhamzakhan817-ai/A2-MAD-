const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Reduce file watching load
config.watchFolders = [
  path.resolve(__dirname, "app"),
  path.resolve(__dirname, "components"),
  path.resolve(__dirname, "screens"),
  path.resolve(__dirname, "redux"),
];

// Set max workers to prevent EMFILE issue
config.maxWorkers = 1;

module.exports = config;
