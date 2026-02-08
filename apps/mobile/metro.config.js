// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch the monorepo root for changes (needed for workspace packages)
config.watchFolders = [monorepoRoot];

// Resolve modules from both the project and monorepo root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Prevent Metro from resolving into the web app's node_modules
// which contains Next.js packages that conflict with React Native
config.resolver.blockList = [
  ...(config.resolver.blockList ? [config.resolver.blockList] : []),
  new RegExp(path.resolve(monorepoRoot, 'apps/web/node_modules/.*').replace(/[/\\]/g, '[/\\\\]')),
  new RegExp(path.resolve(monorepoRoot, 'apps/web/.next/.*').replace(/[/\\]/g, '[/\\\\]')),
];

// Ensure all extensions are handled
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;
