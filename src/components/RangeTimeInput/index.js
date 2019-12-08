import React, { useState, useMemo } from "react";
import moment from "moment";
import { Input, Icon } from "react-native-elements";
import formStyles from "@/constants/formStyles";
import {
  View,
  Picker,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import styles from "./styles";

export default function RangeTimeInput({
  timeRange,
  onChange,
  isValid,
  error,
  label,
  placeholder,
  pickerOnly,
}) {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [opened, setOpened] = useState(pickerOnly || false);
  const [hoursOfDay, setHoursOfDay] = useState(hourPicker(6, 20));

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

  const startIndex = hoursOfDay.indexOf(timeRange.start_at);
  const endIndex = hoursOfDay.indexOf(timeRange.end_at);

  const timeFormated = useMemo(() => {
    let formated =
      startIndex >= 0 && endIndex >= 0
        ? timeRange.start_at + " às " + timeRange.end_at
        : "";
    if (isValid) isValid(formated !== "");
    return formated;
  }, [startIndex, endIndex]); 
  
  return (
    <View>
      { !pickerOnly &&  <TouchableOpacity onPress={() => setOpened(!opened)}>
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
      </TouchableOpacity>}
      {opened && (
        <View style={[styles.row, styles.center, styles.spaced]}>
          <View style={[styles.row, styles.centerH, styles.p10]}>
            <Icon
              name="hourglass-start"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
              containerStyle={{
                ...(Platform.OS === "ios"
                  ? { position: "absolute", left: 15 }
                  : {})
              }}
            />

            <Picker
              style={{
                width: SCREEN_WIDTH * 0.45
              }}
              itemStyle={{ width: SCREEN_WIDTH * 0.45 }}
              selectedValue={startIndex}
              onValueChange={index => {
                onChange({ start_at: hoursOfDay[index], end_at: "" });
              }}
            >
              <Picker.Item label="Inicio" value="-1" />
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
              containerStyle={{
                ...(Platform.OS === "ios"
                  ? { position: "absolute", left: 15 }
                  : {})
              }}
            />
            <Picker
              style={{
                width: SCREEN_WIDTH * 0.45
              }}
              itemStyle={{ width: SCREEN_WIDTH * 0.45 }}
              selectedValue={endIndex}
              onValueChange={index => {
                onChange({ ...timeRange, end_at: hoursOfDay[index] });
              }}
            >
              <Picker.Item label="Termino" value="-1" />
              {hoursOfDay
                .map((key, i) => {
                  return i > startIndex && startIndex >=0 ? (
                    <Picker.Item key={i} label={key} value={i} />
                  ) : null;
                })
                .filter(e => e != null)}
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
}
