import React, { useState } from "react";
import moment from "moment";
import {
  Text,
  View,
  Picker,
  FlatList,
  Dimensions
} from "react-native";
import { ListItem, Badge, Button, Divider, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import styles from "./styles";
import { weekDays, shortWeekDaysValues } from "@/constants/weekDays";

export default function Availabilities({ navigation }) {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const _shortWeekDays = shortWeekDaysValues; 
  const { availabilities } = useSelector(state => state.data.auth.user.person);
  const [weekDay, setWeekDay] = useState("");

  const [timeRange, setTimeRange] = useState({
    start_index: "",
    end_index: ""
  });

  const hoursOfDay = hourPicker(6, 20);

  function hourPicker(min = null, max = null) {
    min = Math.round(min);
    max = Math.round(max);
    max = max < 23 ? max : 23;
    let items = [];
    for (i = min; i <= (max || 23); i++) {
      items[moment({ hour: i }).format("HH:mm")] = i;
      if (i < max && i < 24)
        items[moment({ hour: i, minute: 30 }).format("HH:mm")] = i + 0.5;
    }
    return Object.keys(items);
  }

  function handleDeleteBtn(item) {
    console.log("deleted");
    console.log(item);
  }

  function handleAddBtn() {
    console.log("add");
    console.log(weekDay);
  }

  function addHandle() {
    console.log(timeRange);
  }

  function renderItem(item) {
    const availability = item.item;
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
          style={{ backgroundColor: "#b8daff", marginBottom: 10 }}
          itemStyle={{ textAlign: "center", height: 130 }}
          mode="dialog"
          selectedValue={weekDay}
          onValueChange={key => setWeekDay(key)}
        >
          <Picker.Item label="Escolha um dia na semana..." value="" />
          {Object.values(weekDays).map((label, i) => (
            <Picker.Item key={i} label={label} value={i} />
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
              selectedValue={timeRange.start_index}
              onValueChange={index => {
                setTimeRange({ start_index: index, end_index: "" });
              }}
            >
              <Picker.Item label="Hora Inicial" value="" />
              {hoursOfDay.map((key, i) => (
                <Picker.Item key={i} label={key} value={i} />
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
              selectedValue={timeRange.end_index}
              onValueChange={key => {
                setTimeRange({ ...timeRange, end_index: key });
              }}
            >
              <Picker.Item label="Hora Final" value="" />
              {hoursOfDay
                .filter((h, i) => i > timeRange.start_index)
                .map((key, i) => (
                  <Picker.Item key={i} label={key} value={i} />
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
          disabled={
            weekDay === "" ||
            timeRange.start_index === "" ||
            timeRange.end_index === ""
          }
          buttonStyle={[styles.button, { marginTop: 10 }]}
          title="Adicionar Disponibilidade"
          onPress={addHandle}
        />
      </View>
      <Divider style={{ backgroundColor: "#ccc" }} /> 
      {weekDay !== "" &&
        availabilities.filter(a => a.week_day == weekDay).length <= 0 && (
          <Text
            style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
          >
            Não tem nenhum horário para {weekDays[weekDay]}
          </Text>
        )}
      <FlatList
        keyExtractor={item => JSON.stringify(item)}
        data={availabilities.filter(a => a.week_day == weekDay)}
        renderItem={renderItem}
      />
    </View>
  );
}
