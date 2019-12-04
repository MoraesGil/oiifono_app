import React, { useState } from "react";
import { Text, View, Picker, FlatList, Dimensions } from "react-native";
import {
  ListItem,
  Badge,
  Button,
  Divider,
  Icon,
  Input
} from "react-native-elements";
import { useSelector } from "react-redux";
import styles from "./styles";
import { weekDays, shortWeekDays } from "@/constants/weekDays"; 

export default function Availabilities({ navigation }) {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const _shortWeekDays = Object.keys(shortWeekDays).reverse();
  const { user } = useSelector(state => state.data.auth.user);
  const { availabilities } = useSelector(state => state.data.auth.user.person);  
  const [weekDay, setWeekDay] = useState(0);    
  const [range, setRange] = useState({
    start_at: "",
    end_at: ""
  });
   

  function handleDeleteBtn(item) {
    console.log("deleted");
    console.log(item);
  }

  function handleAddBtn() {
    console.log("add");
    console.log(weekDay);
  }

  function saveHandle() {}

  function renderItem(item) {
    const availability = item.item;
     
    //  return <View></View>
    return (
      <ListItem
        rightIcon={
          <Button
            type="clear"
            icon={
              <Icon
                name="times"
                type="font-awesome"
                color="rgba(0, 0, 0, 0.38)"
                size={20}
                style={{ color: "red", backgroundColor: "transparent" }}
              />
            }
            onPress={() => handleDeleteBtn(availability)}
          />
        }
        title={
          <View style={[styles.container, styles.row, styles.centerH]}>
            <Badge
              value={_shortWeekDays[availability.week_day]}
              status="primary"
            />
            <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 16 }}>
              {availability.start_at} - {availability.end_at}
            </Text>
          </View>
        }
        bottomDivider
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMini}>
        <Picker
          style={{ height: 130, backgroundColor: "#b8daff", marginBottom: 10 }}
          itemStyle={{ height: 130 }}
          mode="dialog"
          selectedValue={weekDay}
          onValueChange={key => {
            setWeekDay(key);
          }}
        >
          <Picker.Item label="Escolha um dia na semana..." value="" />
          {Object.values(weekDays).map((key, i) => (
            <Picker.Item key={i} label={key} value={weekDays[key]} />
          ))}
        </Picker>

        <View style={[styles.row, styles.spaced]}>
          <View
            style={[styles.row, styles.centerH, { backgroundColor: "#b8daff" }]}
          >
            <Icon
              name="hourglass-start"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
            <Picker
              style={{
                height: 50,
                width: SCREEN_WIDTH * 0.4
              }}
              itemStyle={{ height: 50, width: SCREEN_WIDTH * 0.4 }}
              mode="dialog"
              selectedValue={weekDay}
              onValueChange={key => {
                setWeekDay(key);
              }}
            >
              <Picker.Item label="Hora Inicial" value="" />
              {Object.values(weekDays).map((key, i) => (
                <Picker.Item key={i} label={key} value={weekDays[key]} />
              ))}
            </Picker>
          </View>

          <View
            style={[styles.row, styles.centerH, { backgroundColor: "#b8daff" }]}
          >
            <Picker
              style={{
                height: 50,
                width: SCREEN_WIDTH * 0.4
              }}
              itemStyle={{ height: 50, width: SCREEN_WIDTH * 0.4 }}
              mode="dialog"
              selectedValue={weekDay}
              onValueChange={key => {
                setWeekDay(key);
              }}
            >
              <Picker.Item label="Hora Final" value="" />
              {Object.values(weekDays).map((key, i) => (
                <Picker.Item key={i} label={key} value={weekDays[key]} />
              ))}
            </Picker>
            <Icon
              name="hourglass-end"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent", marginRight: 10 }}
            />
          </View>
        </View>

        <Button
          buttonStyle={[styles.button, { marginTop: 10 }]}
          title="Adicionar Disponibilidade"
          onPress={saveHandle}
        />
      </View>
      <Divider style={{ backgroundColor: "#ccc" }} />
      <FlatList
        keyExtractor={item => JSON.stringify(item)}
        data={availabilities}
        renderItem={renderItem}
      />
    </View>
  );
}
