import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { SwipeRow } from "react-native-swipe-list-view";
import { ListItem, Avatar, Icon, Tooltip } from "react-native-elements";
import { useSelector } from "react-redux";
import { LocaleConfig } from "react-native-calendars";
import styles from "./styles";

import moment from "moment";
import ptBr from "@/constants/calendar_ptBr";
LocaleConfig.locales["br"] = ptBr;
LocaleConfig.defaultLocale = "br";

import StatusIcon from "components/StatusIcon.js";

export default function Schedules({ navigation }) {
  const [schedules, setSchedule] = useState({});
  const _schedules = useSelector(state => state.data.schedules.items);
  const _patients = useSelector(state => state.data.patients.items);

  function handleSchedule(schedule) {
    navigation.navigate("Schedule_Form", { schedule });
  }

  function statusBar(schedule) {
    const person = _patients[schedule.person_id];
    return (
      <View style={[styles.row]}>
        {StatusIcon("gender", person.gender)}

        {person.disability && StatusIcon("desability", person.disability)}

        {schedule.confirmed && StatusIcon("confirmed")}

        {schedule.absenced_by && StatusIcon("absenced", schedule.absenced_by)}

        {schedule.attended && StatusIcon("attended", schedule.attended)}

        {person.birthday != false && StatusIcon("birthday")}
      </View>
    );
  }
  
 

  function renderItem(schedule) {
    return (
      <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
        <View style={styles.rowBack}>
          <View>
            {schedule.absenced_by == null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.absenceBtn]}
                onPress={() => alert("faltou")}
              >
                <Text style={styles.absenceBtnText}> Faltou</Text>
              </TouchableOpacity>
            )}

            {schedule.absenced_by != null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.rescheduleBtn]}
                onPress={() => alert("reagendar")}
              >
                <Text style={styles.rescheduleBtnText}> Reagendar</Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            {schedule.absenced_by == null &&
              !schedule.confirmed &&
              !schedule.attended && (
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.confirmBtn]}
                  onPress={() => alert("confirmar")}
                >
                  <Text style={styles.confirmBtnText}> Confirmar</Text>
                </TouchableOpacity>
              )}

            {schedule.absenced_by == null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.attendBtn]}
                onPress={() => alert("evoluir")}
              >
                <Text style={styles.attendBtnText}> Evoluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ListItem
          key={schedule}
          chevron
          bottomDivider
          title={personTemplate(schedule)}
          onPress={() => {
            handleSchedule(schedule);
          }}
        />
      </SwipeRow>
    );
  }

  function clockRange(schedule) {
    return (
      <Tooltip
        style={styles.containerMini}
        popover={
          <Text>
            {schedule.start_at} {" - "} {schedule.end_at}
          </Text>
        }
      >
        <View style={[styles.row, styles.centerH]}>
          <Icon
            name="clock-o"
            type="font-awesome"
            style={styles.containerMini}
          />
          <Text style={styles.containerMini}>{schedule.start_at} </Text>
        </View>
      </Tooltip>
    );
  }

  function personTemplate(i) {
    const person = _patients[i.person_id];

    return (
      <View>
        <View style={styles.row}>
          <View style={styles.centered}>
            <View style={[styles.row, styles.centered, styles.spaced]}>
              {clockRange(i)}
            </View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: person.picture
              }}
            />
          </View>
          <View style={styles.row}>
            <View
              style={{
                alignSelf: "stretch",
                flex: 1,
                paddingLeft: 10
              }}
            >
              <View style={[styles.row, styles.spaced, styles.centerH]}>
                {statusBar(i)}
                <Tooltip popover={<Text> Idade: {person.age} </Text>}>
                  <Text>{person.birthdate}</Text>
                </Tooltip>
              </View>
              <View style={styles.row}>
                <Text>{person.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Ninguém pra hoje !!!</Text>
      </View>
    );
  }

  function rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  function daysRange(day) {
    let days = { ...schedules };

    for (let i = -30; i <= 60; i++) {
      const strTime = moment(day.timestamp)
        .add(i, "days")
        .format("YYYY-MM-DD");
      if (!days[strTime]) days = { ...days, [strTime]: {} };
    }
    return days;
  }

  function loadItems(day) {
    setSchedule({ ...daysRange(day), ..._schedules });
  }

  return (
    <Agenda
      minDate={moment()
        .subtract(3, "M")
        .format("YYYY-MM-DD")}
      maxDate={moment()
        .add(9, "M")
        .format("YYYY-MM-DD")}
      items={schedules}
      loadItemsForMonth={loadItems}
      selected={moment().format("YYYY-MM-DD")}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      renderKnob={() => {
        return (
          <Icon
            name="angle-double-down"
            type="font-awesome"
            style={styles.containerMini}
          />
        );
      }}
      onDayPress={day => {
        console.log("load schedules by this day", day);
      }}
    />
  );
}
