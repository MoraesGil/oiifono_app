import React from "react";
import { Platform } from "react-native"; 
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "./TabBarIcon";

import AgendaTab from "pages/tabs/AgendaTab";
 

const tabNavigator = createBottomTabNavigator(
  {
    Agenda: {
      screen: AgendaTab,
      path: "/agenda",
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Agenda",
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarIcon
            focused={focused}
            name={(Platform.OS === "ios" ? "ios" : "md") + "-calendar"}
          />
        )
      })
    },
    Patients: {
      screen: AgendaTab,
      path: "/agenda",
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Agenda",
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarIcon
            focused={focused}
            name={(Platform.OS === "ios" ? "ios" : "md") + "-people"}
          />
        )
      })
    },
    Settings: {
      screen: AgendaTab,
      path: "/agenda",
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Ajustes",
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-options" : "md-options"}
          />
        )
      })
    }

    // PatientsStack,
    // SettingsStack
  },
  {
    initialRouteName: "Agenda",
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#e91e63",
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
