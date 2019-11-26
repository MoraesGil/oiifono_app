import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";   
import { ListItem, Avatar, Icon, Tooltip } from "react-native-elements";
import { LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

import grid from "@/constants/grid"; 
import colors from "@/constants/Colors";

const WINDOW_WIDTH = Dimensions.get("window").width;
 

export default class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  } 
   

  render() {
    return (
      <View style={styles.row}>
        <Text>Ninguém pra hoje !!!</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  standaloneRowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  }
});
