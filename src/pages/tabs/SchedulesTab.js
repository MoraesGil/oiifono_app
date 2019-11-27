import React from "react";
import OptionsMenu from "react-native-options-menu";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Schedules from "pages/Schedules";

// import ButtonsDetails from "../views/buttons_detail";

// const ButtonsDetailTabView = ({ navigation }) => (
//   <ButtonsDetails
//     banner={`${navigation.state.params.name}s Profile`}
//     navigation={navigation}
//   />
// );

const SchedulesTab = createStackNavigator(
  {
    Schedules: {
      screen: ({ navigation }) => <Schedules navigation={navigation} />,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        title: "Schedules",
        headerRight: (
          <OptionsMenu
            customButton={
              <Icon
                name="menu"
                size={30}
                type="entypo"
                containerStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              width: 32,
              height: 8,
              margin: 7.5,
              resizeMode: "contain"
            }}
            destructiveIndex={1}
            options={["Novo agendamento", "Cancelar"]}
            actions={[
              this.scheduler,
              () => {
                return;
              }
            ]}
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

export default SchedulesTab;
