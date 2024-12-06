const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "cheap-module-source-map",
  },
  chainWebpack: (config) => {
    config.output.devtoolModuleFilenameTemplate(
      (info) => `webpack:///${info.resourcePath}`
    );
    config.output.devtoolFallbackModuleFilenameTemplate(
      (info) => `webpack:///${info.resourcePath}?${info.hash}`
    );
  },
});
