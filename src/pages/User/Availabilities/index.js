import React, { useState } from "react";
import { Text, View, Picker } from "react-native";
import { ListItem, Badge, Button, Divider, Icon } from "react-native-elements";

import styles from "./styles";
import weekDays from "@/constants/weekDays"; 

export default function Availabilities({ navigation }) {
  //  const user = navigation.getParam("user");
  // const availabilities = user.person.availabilities;
  const [weekDay, setWeekDay] = useState(0);
  const [start_at, setStart_at] = useState(0);
  const [end_at, setEnd_at] = useState(0);
  
 

  const availabilities = {
    [weekDays.seg]: [
      { start: "07:00", end: "12:00" },
      { start: "16:00", end: "20:00" }
    ],
    [weekDays.ter]: [
      { start: "07:00", end: "12:00" },
      { start: "16:00", end: "20:00" }
    ],
    [weekDays.qua]: [
      { start: "07:00", end: "12:00" },
      { start: "16:00", end: "20:00" }
    ],
    [weekDays.qui]: [
      { start: "07:00", end: "12:00" },
      { start: "16:00", end: "20:00" }
    ],
    [weekDays.sex]: [
      { start: "07:00", end: "12:00" },
      { start: "16:00", end: "20:00" }
    ],
    [weekDays.sab]: [{ start: "07:00", end: "11:00" }],
    [weekDays.dom]: [{ start: "", end: "" }]
  };

  function handleDeleteBtn() {
    console.log("deleted");
    console.log(item);
  }

  function handleAddBtn() {
    console.log("add");
    console.log(weekDay);
  }

  function renderItem() {
    return (
      <ListItem
        title={
          <View>
            <Badge value="Seg." status="primary" />
            <Text>
              {item.start} - {item.end}
            </Text>
            <Button title="Adicionar horário" onPress={handleDeleteBtn(item)} />
          </View>
        }
        bottomDivider
      />
    );
  } 

  return (
    <View style={styles.container}>
       
      <Divider style={{ backgroundColor: "#ccc" }} />
      <View>
        <Picker
          mode="dialog"
          selectedValue={weekDay}
          onValueChange={key => setWeekDay(key)}
        >
          {Object.keys(weekDays).map((key, i) => (
            <Picker.Item key={i} label={key} value={weekDays[key]} />
          ))}
        </Picker>
      </View>
      <Divider style={{ backgroundColor: "#ccc" }} />
    </View>
  );
}
