import React, { useState } from "react";
import Routes from "./src/routes";

import AppLoading from "components/AppLoading";
import vectorFonts from "@/helpers/vector-fonts";
import { cacheImages, cacheFonts } from "@/helpers/AssetsCaching";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("assets/icon.png"),
      require("assets/logo.png")
    ]);

    const fontAssets = cacheFonts([...vectorFonts]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <Routes />;
}
