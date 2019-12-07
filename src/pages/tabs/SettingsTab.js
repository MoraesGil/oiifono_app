import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Settings from "pages/Settings";
import Availabilities from "pages/User/Availabilities";
import PasswordUpdate from "pages/User/PasswordUpdate";
import ProfileUpdate from "pages/User/ProfileUpdate";

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
    ProfileUpdate: {
      screen: ProfileUpdate,
      path: "/profileUpdate",
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Dados pessoais"
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
    // initialRouteName: "Availabilities",
    animationEnabled: true,
    swipeEnabled: true
  }
);

SettingsTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default SettingsTab;
