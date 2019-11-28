import React, { useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import { Agenda } from "react-native-calendars";
import { SwipeRow } from "react-native-swipe-list-view";
import { ListItem, Avatar, Icon, Tooltip } from "react-native-elements";
import { useSelector } from 'react-redux' 
import { LocaleConfig } from "react-native-calendars";
import grid from "@/constants/grid";

import moment from "moment";
import ptBr from "@/constants/calendar_ptBr";
LocaleConfig.locales["br"] = ptBr;
LocaleConfig.defaultLocale = "br";

import StatusIcon from '@/components'


export default function Schedules({ navigation }) {
  const [schedules, setSchedule] = useState({});
  const _schedules = useSelector(state => state.data.schedules.items);

  function statusBar(schedule) {
    return (
      <View style={[grid.row, grid.containerMini]}>  
        {schedule.person.disability != false && (
          StatusIcon("desabilities")
        )}

        {schedule.person.confirmed != false && (
          StatusIcon("confirmed")
        )}

        {schedule.person.absenced_by != false && (
          StatusIcon("absenced",schedule.person.absenced_by)
        )}

        {schedule.person.birthday != false && (
          StatusIcon("birthday")
        )}
      </View>
    );
  }

  function itemTemplate(i) {
    return (
      <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
        <View style={styles.standaloneRowBack}>
          <Text>Faltou</Text>
          <Text>Confirmar</Text>
        </View>

        <ListItem
          style={{
            paddingRight: 2
          }}
          key={i}
          chevron
          bottomDivider
          title={personTemplate(i)}
        />
      </SwipeRow>
    );
  }

  function clockRange(schedule) {
    return (
      <Tooltip
        style={grid.containerMini}
        popover={
          <Text> 
            {schedule.start_at} {" - "} {schedule.end_at} 
          </Text>
        }
      >
        <View style={[grid.row, grid.centerH]}>
          <Icon name="clock-o" type="font-awesome" style={grid.containerMini} />  
          <Text style={grid.containerMini}>{i.start_at} </Text>
        </View>
      </Tooltip>
    );
  } 

  function personTemplate(i) {
    return (
      <View>
        <View style={grid.row}>
          <View style={grid.centered}>
            <View style={[grid.row, grid.centered, grid.spaced]}>
            clockRange(i)
            </View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: i.person.picture
              }}
            />
          </View>
          <View style={grid.row}>
            <View
              style={{
                alignSelf: "stretch",
                flex: 1,
                paddingLeft: 10
              }}
            >
              <View style={[grid.row, grid.spaced, grid.centerH]}>
                {statusBar(i)}
                <Tooltip popover={<Text> Idade: {i.person.age} </Text>}>
                  <Text>{i.person.birthdate}</Text>
                </Tooltip>
              </View> 
              <View style={grid.row}>
                <Text>{i.person.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderItem(item) {
    return itemTemplate(item);
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

  function daysRange() {
    let days = { ...schedules };
    for (let i = -30; i <= 60; i++) {
      const strTime = moment()
        .add(i, "days")
        .format("YYYY-MM-DD");  
      if (!days[strTime]) days = { ...days, [strTime]: [] };
    }
    return days;
  }

  function loadItems() {  
    setSchedule({...daysRange(),..._schedules});
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
            style={grid.containerMini}
          />
        );
      }}
      onDayPress={day => {
        console.log("selected day", day);
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  standaloneRowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  }
});
