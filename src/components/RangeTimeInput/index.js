import React, { useState, useMemo } from "react";
import moment from "moment";
import { Input, Icon } from "react-native-elements";
import formStyles from "@/constants/formStyles";
import { View, Picker, Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function RangeTimeInput({
  onChange,
  error,
  label,
  placeholder
}) {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [opened, setOpened] = useState(true);
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

  const timeFormated = useMemo(() => {
    console.log(timeRange);

    timeRange.start_index > 0 && timeRange.end_index > 0
      ? hoursOfDay[timeRange.start_index] +
        " às " +
        hoursOfDay[timeRange.end_index]
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
              selectedValue={timeRange.end_index}
              onValueChange={key => {
                setTimeRange({ ...timeRange, end_index: key });
              }}
            >
              <Picker.Item label="Hora Final" value="" /> 
              {timeRange.start_index !== "" &&
                hoursOfDay.map((key, i) => {
                  return i > timeRange.start_index ? (
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
