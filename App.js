import React, { useState } from "react";
import Routes from "./src/routes";

import AppLoading from "components/AppLoading";
import vectorFonts from "@/helpers/vector-fonts";
import { cacheImages, cacheFonts } from "@/helpers/AssetsCaching";

import { Provider } from 'react-redux';
import store from "@/store";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("assets/icon.png"),
      require("assets/logo.png")
    ]);

    const fontAssets = cacheFonts([
      ...vectorFonts,
      { georgia: require("assets/fonts/Georgia.ttf") },
      { regular: require("assets/fonts/Montserrat-Regular.ttf") },
      { light: require("assets/fonts/Montserrat-Light.ttf") },
      { bold: require("assets/fonts/Montserrat-Bold.ttf") },
      { UbuntuLight: require("assets/fonts/Ubuntu-Light.ttf") },
      { UbuntuBold: require("assets/fonts/Ubuntu-Bold.ttf") },
      { UbuntuLightItalic: require("assets/fonts/Ubuntu-Light-Italic.ttf") }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <Provider store={store}>
        <AppLoading
          startAsync={loadAssetsAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      </Provider>
    );
  }

  return <Routes />;
}
