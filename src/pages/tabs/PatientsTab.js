import React from "react";
import OptionsMenu from "react-native-options-menu";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Patients from "pages/Patients";
// import ButtonsDetails from "../views/buttons_detail";

const PatientsTabView = ({ navigation }) => (
  <Patients navigation={navigation} />
);

// const ButtonsDetailTabView = ({ navigation }) => (
//   <ButtonsDetails
//     banner={`${navigation.state.params.name}s Profile`}
//     navigation={navigation}
//   />
// );

const PatientsTab = createStackNavigator(
  {
    Agenda: {
      screen: PatientsTabView,
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

export default PatientsTab;
