import React, { useState, useMemo } from "react";
import moment from "moment";
import { Input, Icon } from "react-native-elements";
import formStyles from "@/constants/formStyles";
import { View, Picker, Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function RangeTimeInput({
  timeRange,
  onChange,
  error,
  label,
  placeholder
}) {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [opened, setOpened] = useState(false);
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

  const start_index = hoursOfDay.indexOf(timeRange.start_at || "") >= 0 ? hoursOfDay.indexOf(timeRange.start_at) : "";
  const end_index = hoursOfDay.indexOf(timeRange.end_at || "") >= 0 ? hoursOfDay.indexOf(timeRange.end_at) : "";

  const timeFormated = useMemo(() => {
    timeRange.start_at != "" && timeRange.end_at != ""
      ? timeRange.start_at +
        " às " +
        timeRange.end_at
      : null;
  }, [timeRange]); 

  return (
    <View>
      <TouchableOpacity onPress={() => setOpened(!opened)}>
        <Input
          placeholder={placeholder}
          pointerEvents="none"
          leftIcon={
            <Icon
              name="clock-o"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          editable={false}
          label={label}
          value={timeFormated}
          inputStyle={formStyles.inputWithIcon}
          errorMessage={error}
        />
      </TouchableOpacity>
      {opened && (
        <View style={[styles.row, styles.center]}>
          <View style={[styles.row, styles.centerH, styles.p10]}>
            <Icon
              name="hourglass-start"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
              containerStyle={{ position: "absolute", left: 15 }}
            />

            <Picker
              style={{
                width: SCREEN_WIDTH * 0.4
              }}
              itemStyle={{ width: SCREEN_WIDTH * 0.4 }}
              mode="dialog"
              selectedValue={start_index}
              onValueChange={index => {
                onChange({ start_at: hoursOfDay[index], end_at: "" });
              }}
            >
              <Picker.Item label="Inicio" value="" />
              {hoursOfDay.map((key, i) => (
                <Picker.Item key={i} label={key} value={i} />
              ))}
            </Picker>
          </View>

          <View style={[styles.row, styles.centerH, styles.p10]}>
            <Icon
              name="hourglass-end"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
              containerStyle={{ position: "absolute", left: 15 }}
            />
            <Picker
              style={{
                width: SCREEN_WIDTH * 0.4
              }}
              itemStyle={{ width: SCREEN_WIDTH * 0.4 }}
              mode="dialog"
              selectedValue={end_index}
              onValueChange={index => {
                onChange({ ...timeRange, end_at: hoursOfDay[index] });
              }}
            >
              <Picker.Item label="Termino" value="" />
              {start_index !== "" &&
                hoursOfDay.map((key, i) => {
                  return i > start_index ? (
                    <Picker.Item key={i} label={key} value={i} />
                  ) : null;
                })}
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
}
