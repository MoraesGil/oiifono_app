import React from "react";
import { Platform } from "react-native";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from 'react-native-elements';

import AgendaHome from "pages/Agenda_Home"; 
// import ButtonsDetails from "../views/buttons_detail";


const AgendaTabView = ({ navigation }) => (
  <AgendaHome navigation={navigation} />
);

// const ButtonsDetailTabView = ({ navigation }) => (
//   <ButtonsDetails
//     banner={`${navigation.state.params.name}s Profile`}
//     navigation={navigation}
//   />
// );

const AgendaTab = createStackNavigator(
  {
    Agenda: {
      screen: AgendaTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({ 
        title: "Agenda",
        headerRight: (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            containerStyle={{ marginRight: 10 }}
            // onPress={navigation.toggleDrawer}
          />
        )
      })
    }
    // Button_Detail: {
    //   screen: ButtonsDetailTabView,
    //   path: "/buttons_detail",
    //   navigationOptions: {
    //     title: "Buttons Detail"
    //   }
    // }
  },
  config
);

export default AgendaTab;