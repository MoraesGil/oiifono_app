import React, { useState  } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

import { Agenda } from "react-native-calendars";
import { SwipeRow } from "react-native-swipe-list-view";
import { ListItem, Avatar, Icon, Tooltip } from "react-native-elements";
import { LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
 
import grid from "@/constants/grid";
import ptBr from "@/constants/calendar_ptBr";
import colors from "@/constants/Colors";

const WINDOW_WIDTH = Dimensions.get("window").width;

LocaleConfig.locales["br"] = ptBr;
LocaleConfig.defaultLocale = "br";

export default function Agenda({ navigation }) {
  const [items, setItems] = useState([])  

  iconsTemplate = person => {
    return (
      <View style={[grid.row, grid.containerMini]}>
        <Tooltip
          popover={
            <Text> {person.sex == "m" ? "Masculino" : "Feminino"} </Text>
          }
        >
          <Ionicons
            style={grid.containerMini2x}
            name={person.sex == "m" ? "md-man" : "md-woman"}
            size={26}
            color={person.sex == "m" ? colors.male : colors.female}
          />
        </Tooltip>

        {person.disability != false && (
          <Tooltip popover={<Text> {person.disability} </Text>}>
            <Icon
              style={grid.containerMini2x}
              name="wheelchair"
              color={colors.disability}
              type="font-awesome"
            />
          </Tooltip>
        )}

        {person.confirmed != false && (
          <Tooltip popover={<Text> Confirmado </Text>}>
            <Icon
              style={grid.containerMini2x}
              name="asterisk"
              color={colors.ok}
              type="font-awesome"
            />
          </Tooltip>
        )}

        {person.miss != false && (
          <Tooltip popover={<Text> Faltou </Text>}>
            <Icon
              style={grid.containerMini2x}
              name="asterisk"
              color={colors.danger}
              type="font-awesome"
            />
          </Tooltip>
        )}

        {person.birthday != false && (
          <Tooltip popover={<Text> Aniversariante </Text>}>
            <Icon
              style={grid.containerMini2x}
              name="birthday-cake"
              type="font-awesome"
              color="red"
            />
          </Tooltip>
        )}
      </View>
    );
  };

  function itemTemplate (schedule){
    return (
      <SwipeRow leftOpenValue={150} rightOpenValue={-150}>
        <View style={styles.standaloneRowBack}>
          <Text>
          
          </Text>
          <Text>
          
          </Text>
        </View>

        <ListItem
          style={{
            paddingRight: 2
          }}
          key={i}
          chevron
          bottomDivider
          title={personTemplate(schedule)}
        />
      </SwipeRow>
    );
  };

  function personTemplate(person) {
    return (
      <View>
        <View style={grid.row}>
          <View style={grid.centered}>
            <View style={[grid.row, grid.centered, grid.spaced]}>
              <Tooltip
                style={grid.containerMini}
                popover={<Text> 12 : 30 - 13 : 00 </Text>}
              >
                <View style={[grid.row, grid.centerH]}>
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    style={grid.containerMini}
                  />

                  <Text style={grid.containerMini}>12:30</Text>
                </View>
              </Tooltip>
            </View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri:
                  person.picture
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
                {this.iconsTemplate(person)}   
                  <Tooltip popover={<Text> Idade: {person.age} </Text>}>
                    <Text>{person.birthdate}</Text>
                  </Tooltip>                 
              </View>

              <View style={grid.row}>
                <Text>{person.name}</Text>
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

  function renderEmptyDate(){
    return (
      <View style={styles.emptyDate}>
        <Text>Ninguém pra hoje !!!</Text>
      </View>
    );
  }

  function rowHasChanged(r1, r2){
    return r1.name !== r2.name;
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
  
  function loadItems(day){
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              picture:"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              name: "Fulaninho de souza",
              birthdate: "24/12/1990",
              age: Math.floor(Math.random() * 100),
              birthday: Math.floor(Math.random() * j) % 2,
              confirmed: Math.floor(Math.random() * j) % 3,
              miss: Math.floor(Math.random() * j) % 5,
              disability:
                Math.floor(Math.random() * 80) > 8 ? "Deficiência X" : "",
              sex: numItems > 3 ? "m" : "f"
            });
          }
        }
      } //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({ items: newItems });
    }, 1000); // 
  }
  
  return (
    <Agenda
      minDate={"2010-05-10"}
      maxDate={"2030-05-30"}
      items= {items}
      loadItemsForMonth={loadItems()}
      selected={"2019-10-13"}
      renderItem={renderItem()}
      renderEmptyDate={renderEmptyDate()}
      rowHasChanged={rowHasChanged()}
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
