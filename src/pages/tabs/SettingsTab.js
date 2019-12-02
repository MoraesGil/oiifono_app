import React from "react";
import OptionsMenu from "react-native-options-menu";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";

import Settings from "pages/Settings";
import Availabilities from "pages/Availabilities";  

 
const SettingsTabView = ({ navigation }) => (
  <Settings navigation={navigation} />
);

 
const SettingsTab = createStackNavigator(
  {
    Settings: {
      screen: SettingsTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        title: "Configurações da conta"
      })
    },
    Availabilities: {
      screen: Availabilities,
      path: "/availabilities"
    }
  },
  {
    initialRouteName: "Settings",
    animationEnabled: true,
    swipeEnabled: true
  }
);

export default SettingsTab;
