import React, { Component, useState } from "react";

import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import { Input, Icon } from "react-native-elements";

import api from "@/services/api";
import styles from "./styles";

import {
  Autocomplete,
  withKeyboardAwareScrollView
} from "react-native-dropdown-autocomplete";

export default function PatientDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>patient detail </Text>
    </View>
  );
}
