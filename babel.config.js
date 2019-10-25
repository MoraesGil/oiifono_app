module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            pages: "./src/pages",
            views: "./src/views",
            assets: "./src/assets",
            components: "./src/components" 
          }
        }
      ]
    ]
  };
};
