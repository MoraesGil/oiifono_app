import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Agenda } from "react-native-calendars";
import { SwipeRow } from "react-native-swipe-list-view";
import { ListItem, Avatar, Icon, Tooltip } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { LocaleConfig } from "react-native-calendars";
import styles from "./styles";

import moment from "moment";
import ptBr from "@/constants/calendar_ptBr";
LocaleConfig.locales["br"] = ptBr;
LocaleConfig.defaultLocale = "br";
import { selectAgenda, Creators as SchedulesActions } from "ducks/schedules";
import StatusIcon from "components/StatusIcon.js";

export default function Schedules({ navigation }) {
  const [agenda, setAgenda] = useState({});
  const _agenda = useSelector(selectAgenda);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(SchedulesActions.sagaFetchSchedules({ date: "2019-12-15" }));
   
    // dispatch(SchedulesActions.addSchedule());

    return () => {};
  }, []);

  function emputyDaysRange(day) {
    let days = {};

    for (let i = -15; i <= 45; i++) {
      const strTime = moment(day.timestamp)
        .add(i, "days")
        .format("YYYY-MM-DD");
      if (!days[strTime]) days = { ...days, [strTime]: {} };
    }
    return days;
  }

  function loadItems(day) {
    setAgenda({ ...emputyDaysRange(day), ..._agenda });
  }

  function handleSchedule(schedule) {
    navigation.navigate("ScheduleForm", { schedule: schedule });
  }

  function statusBar(schedule) {
    const person = schedule.patient;
    return (
      <View style={[styles.container, styles.row]}>
        {StatusIcon("gender", person.gender)}

        {person.disability && StatusIcon("desability", person.disability)}

        {schedule.confirmed === 1 && StatusIcon("confirmed")}

        {schedule.absenced_by && StatusIcon("absenced", schedule.absenced_by)}

        {schedule.attended && StatusIcon("attended", schedule.attended)}
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
        <View style={[styles.container, styles.row, styles.centerH]}>
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

  function personTemplate(schedule) {
    const person = schedule.patient;

    return (
      <View>
        <View style={[styles.container, styles.row]}>
          <View style={styles.center}>
            <View
              style={[
                styles.container,
                styles.row,
                styles.center,
                styles.spaced
              ]}
            >
              {clockRange(schedule)}
            </View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: person.picture
              }}
            />
          </View>
          <View style={[styles.container, styles.row]}>
            <View
              style={{
                alignSelf: "stretch",
                flex: 1,
                paddingLeft: 10
              }}
            >
              <View
                style={[
                  styles.container,
                  styles.row,
                  styles.spaced,
                  styles.centerH
                ]}
              >
                {statusBar(schedule)}
              </View>
              <View style={[styles.container]}>
                <Text>{person.name}</Text>
                <View style={[styles.row, styles.spaced, styles.centerH]}>
                  <Text>
                    Idade:
                    {moment().diff(person.birthdate, "years")}
                  </Text>

                  <View style={[styles.row, styles.centerH]}>
                    {person.birthday && StatusIcon("birthday")}
                    <Text>{moment(person.birthdate).format("DD/MM/YYYY")}</Text>
                  </View>
                </View>
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
  return (
    <Agenda
      minDate={moment()
        .subtract(3, "M")
        .format("YYYY-MM-DD")}
      maxDate={moment()
        .add(9, "M")
        .format("YYYY-MM-DD")}
      items={agenda}
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
