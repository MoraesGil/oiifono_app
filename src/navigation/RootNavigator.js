import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Sign from "pages/Sign";
import App from "./MainTabNavigator";

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App
      },
      {
        initialRouteName: signedIn ? "App" : "Sign"
      }
    )
  );
