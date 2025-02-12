const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

module.exports = (() => {
  const projectRoot = __dirname;
  const monorepoRoot = path.resolve(projectRoot, "../..");

  const config = getDefaultConfig(projectRoot);

  const { resolver } = config;

  const monorepoPackages = {
    "@repo/api": path.resolve(monorepoRoot, "packages/api"),
  };

  config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];

  // 2. Let Metro know where to resolve packages and in what order
  config.resolver = {
    ...resolver,
    disableHierarchicalLookup: true,
    unstable_enablePackageExports: true,
    extraNodeModules: monorepoPackages,
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],
  };

  return withNativeWind(config, { input: "./global.css" });
})();
