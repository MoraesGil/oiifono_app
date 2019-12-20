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
            ducks: "./src/store/ducks",
            sagas: "./src/store/sagas",
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
