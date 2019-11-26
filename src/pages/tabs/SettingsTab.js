import React from "react";
import OptionsMenu from "react-native-options-menu";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Settings from "pages/Settings";
// import ButtonsDetails from "../views/buttons_detail";

const SettingsTabView = ({ navigation }) => (
  <Settings navigation={navigation} />
);

// const ButtonsDetailTabView = ({ navigation }) => (
//   <ButtonsDetails
//     banner={`${navigation.state.params.name}s Profile`}
//     navigation={navigation}
//   />
// );

const SettingsTab = createStackNavigator(
  {
    Agenda: {
      screen: SettingsTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        title: "Agenda",
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
            options={["Adicionar", "Cancelar"]}
            actions={[
              () => {
                return;
              },
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

export default SettingsTab;
