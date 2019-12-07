import React from "react"; 
import { TouchableOpacity, Text } from "react-native"; 
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Patients from "pages/Patients";
import PatientForm from "pages/Patients/FormPatient";
import PatientDetail from "pages/Patients/DetailPatient";
 
const PatientsTabView = ({ navigation }) => (
  <Patients navigation={navigation} />
);

const PatientFormTabView = ({ navigation }) => (
  <PatientForm navigation={navigation} />
);
const PatientDetailTabView = ({ navigation }) => (
  <PatientDetail navigation={navigation} />
);
 
const PatientsTab = createStackNavigator(
  {
    patients: {
      screen: PatientsTabView,
      path: "/",
      navigationOptions: ({ navigation }) => ({
        title: "Pacientes",
        headerBackTitle: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("patient_form")}>
            <Icon
              containerStyle={{ marginRight: 15 }}
              name="user-plus"
              type="font-awesome"
            />
          </TouchableOpacity>
        )
      })
    },
    patient_form: {
      screen: PatientFormTabView,
      path: "/patient_form",
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("patient_id")
          ? "Atualizar dados"
          : "Novo Paciente"
      })
    },
    patientDetail: {
      screen: PatientDetailTabView,
      path: "/patientDetail",
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: null,
        headerTitle: "Ficha Paciente"
      })
    }
  },
  {
    initialRouteName: "patients",
    animationEnabled: true,
    swipeEnabled: true
  }
);  

PatientsTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default PatientsTab;
