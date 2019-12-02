import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "./TabBarIcon";

import SchedulesTab from "pages/tabs/SchedulesTab";
import PatientsTab from "pages/tabs/PatientsTab";
import SettingsTab from "pages/tabs/SettingsTab";

const tabNavigator = createBottomTabNavigator(
  {
    Schedules: {
      screen: SchedulesTab,
      path: "/schedules",
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Agendamentos",
        tabBarIcon: ({ focused }) => (
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
        tabBarIcon: ({ focused }) => (
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
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-options" : "md-options"}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Schedules",
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
