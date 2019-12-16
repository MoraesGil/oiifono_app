import React, { useState } from "react"; 
import {
  Text,
  View,
  Picker,
  FlatList,
  Dimensions,
  SafeAreaView
} from "react-native";
import { ListItem, Badge, Button, Divider, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import styles from "./styles";
import { weekDays, shortWeekDaysValues } from "@/constants/weekDays";
import RangeTimeInput from "components/RangeTimeInput";

export default function Availabilities({ navigation }) {  
  const _shortWeekDays = shortWeekDaysValues;
  // const { availabilities } = useSelector(state => state.auth.user.person);

  const [weekDay, setWeekDay] = useState("");
  const [isTimePicked, setIsTimePicked] = useState(false); 
  const [timeRange, setTimeRange] = useState({});
  

  function handleDeleteBtn(item) {
    console.log("deleted");
    console.log(item);
  }

  function handleAddBtn() {
    console.log(isTimePicked); 
    
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
    <SafeAreaView style={styles.container}>
      <Picker
        style={styles.p10}
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

      <RangeTimeInput
        timeRange={timeRange}
        label="Disponibilidade"
        placeholder="Seu horario de atendimento"
        onChange={setTimeRange}
        isValid={setIsTimePicked}
      />

      <Button
        disabled={weekDay === "" || !isTimePicked}
        buttonStyle={[styles.button, { marginTop: 10 }]}
        title="Adicionar Disponibilidade"
        onPress={handleAddBtn}
      />

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
    </SafeAreaView>
  );
}
