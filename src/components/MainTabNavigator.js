import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "./TabBarIcon";

import AgendaTab from "pages/tabs/AgendaTab";
import PatientsTab from "pages/tabs/PatientsTab";
import SettingsTab from "pages/tabs/SettingsTab";

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
      screen: PatientsTab,
      path: "/patients",
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Pacientes",
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarIcon
            focused={focused}
            name={(Platform.OS === "ios" ? "ios" : "md") + "-people"}
          />
        )
      })
    },
    Settings: {
      screen: SettingsTab,
      path: "/settings",
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
  },
  {
    // initialRouteName: "Agenda",
    animationEnabled: true,
    swipeEnabled: true, 
    tabBarPosition: Platform.OS === "ios" ? "bottom" : "top",
    tabBarOptions: {
      activeTintColor: "#e91e63", 
      showIcon: true
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
