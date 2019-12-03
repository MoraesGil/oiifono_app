import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Settings from "pages/Settings";
import Availabilities from "pages/User/Availabilities";
import PasswordUpdate from "pages/User/PasswordUpdate";

const SettingsTabView = ({ navigation }) => (
  <Settings navigation={navigation} />
);

const SettingsTab = createStackNavigator(
  {
    Settings: {
      screen: SettingsTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: null,
        title: "Configurações da conta"
      })
    },
    Availabilities: {
      screen: Availabilities,
      path: "/availabilities",
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Horarios de atendimento"
      })
    },
    PasswordUpdate: {
      screen: PasswordUpdate,
      path: "/passwordUpdate",
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Atualizar senha"
      })
    }
  },
  {
    initialRouteName: "Settings",
    animationEnabled: true,
    swipeEnabled: true
  }
);

export default SettingsTab;
