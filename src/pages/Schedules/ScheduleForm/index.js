import React, { useState } from "react";
   
import {
  View, 
  Text,
  ScrollView
} from "react-native";
   
import styles from "./styles"; 

export default function Schedule({ navigation }) {
  const [schedule, setSchedule] = useState(navigation.getParam("schedule") || {}); 

  return (
    <View style={styles.container}>
      <Text>{schedule.id}</Text>
    </View>
  );
}
