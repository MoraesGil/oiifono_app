import React from "react";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";

import Schedules from "pages/Schedules";

const SchedulesTabView = ({ navigation }) => (
  <Schedules navigation={navigation} />
);

import ScheduleForm from "pages/Schedules/ScheduleForm";

const ScheduleFormTabView = ({ navigation }) => (
  <ScheduleForm navigation={navigation} />
);

const SchedulesTab = createStackNavigator(
  {
    Schedules: {
      screen: SchedulesTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        title: "Agendamentos",
        headerBackTitle: null,
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.navigate("Schedule_Form")}
          >
            <Icon
              containerStyle={{ marginRight: 15 }}
              name="calendar-plus-o"
              type="font-awesome"
            />
          </TouchableOpacity>
        )
      })
    },
    Schedule_Form: {
      screen: ScheduleFormTabView,
      path: "/schedule_form",
      navigationOptions: ({ navigation }) => ({
        headerTitle: (navigation.getParam("schedule_id") ? "Atualizar": "Novo" ) + " agendamento"
      })
    }
  },
  {
    initialRouteName: "Schedules",
    animationEnabled: true,
    swipeEnabled: true
  }
);

SchedulesTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default SchedulesTab;
