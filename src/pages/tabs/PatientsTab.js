import React from "react"; 
import { TouchableOpacity } from "react-native";
import config from "@/constants/stack";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

import Patients from "pages/Patients";
import PatientForm from "pages/PatientForm";
import PatientDetail from "pages/PatientDetail";
 

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
      path: "/patient_form"
    },
    patientDetail: {
      screen: PatientDetailTabView,
      path: "/patientDetail"
    }
  },
  config
);

export default PatientsTab;
