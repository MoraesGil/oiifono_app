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
import api from "@/services/api";
export default function Schedules({ navigation }) {
  const [agenda, setAgenda] = useState({});
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [futureDays, setFutureDays] = useState([]);

  useEffect(() => {
    
    loadDaysWithSchedule = async () => {
      const { data } = await api.get("/schedules/future-days/");
      setFutureDays(emptyDaysWithScheduleRange(data)); 
    };

    loadDaysWithSchedule();
    
    return () => {
      setFutureDays([]);
    };  
  }, []);

  useEffect(() => {
     
    loadDays= async () => {
       await setAgenda({
         ...emptyDaysRange(),
         ...futureDays,
         ...agenda
       });
    }; 
    loadDays();  

    // dispatch(SchedulesActions.addSchedule());
    return () => {};
  }, [selectedDay]);

  function handleSchedule(schedule) {
    navigation.navigate("ScheduleForm", { schedule: schedule });
  }

  function handleAbsenced(schedule) {
    alert("faltou");
  }

  function handleReschedule(schedule) {
    alert("reagendar");
  }

  function handleConfirmSchedule(schedule) {
    alert("ConfirmarPresença");
  }

  function handleAttendSchedule(schedule) {
    alert("Atender agendamento");
  }

  function emptyDaysWithScheduleRange(daysWithSchedule) {
    let days = {};

    daysWithSchedule.forEach(strTime => {
      days[strTime] = [1];
    });

    return days;
  }

  function emptyDaysRange() {
    let days = {};

    for (let i = -20; i <= 20; i++) {
      const strTime = moment(selectedDay)
        .add(i, "days")
        .format("YYYY-MM-DD");
      if (!days[strTime]) days = { ...days, [strTime]: [] };
    }
    return days;
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
      <View>
        <Text>
          {typeof schedule === "object" ? "paciente" : "carregando..."}
        </Text>
      </View>
    );
    return (
      <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
        <View style={styles.rowBack}>
          <View>
            {schedule.absenced_by == null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.absenceBtn]}
                onPress={() => handleAbsenced(schedule)}
              >
                <Text style={styles.absenceBtnText}> Faltou</Text>
              </TouchableOpacity>
            )}

            {schedule.absenced_by != null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.rescheduleBtn]}
                onPress={() => handleReschedule(schedule)}
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
                  onPress={() => handleConfirmSchedule(schedule)}
                >
                  <Text style={styles.confirmBtnText}> Confirmar</Text>
                </TouchableOpacity>
              )}

            {schedule.absenced_by == null && !schedule.attended && (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.attendBtn]}
                onPress={() => handleAttendSchedule(schedule)}
              >
                <Text style={styles.attendBtnText}> Atender</Text>
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

  return (
    <Agenda
      minDate={moment(selectedDay)
        .subtract(3, "M")
        .format("YYYY-MM-DD")}
      maxDate={moment(selectedDay)
        .add(9, "M")
        .format("YYYY-MM-DD")}
      items={agenda}
      selected={selectedDay}
      loadItemsForMonth={day => setSelectedDay(day.dateString)}
      renderItem={renderItem}
      renderEmptyDate={() => (
        <View style={styles.emptyDate}>
          <Text>Ninguém pra hoje !!!</Text>
        </View>
      )}
      rowHasChanged={(r1, r2) => r1.id !== r2.id}
      renderKnob={() => {
        return (
          <Icon
            name="angle-double-down"
            type="font-awesome"
            style={styles.containerMini}
          />
        );
      }}
      onDayPress={day => setSelectedDay(day.dateString)}
    />
  );
}
