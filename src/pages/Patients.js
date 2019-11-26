import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
  

const personTemplate = person => {
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
          <picture
            rounded
            size="medium"
            source={{
              uri: person.picture
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
};

const itemTemplate = i => {
  return (
    <SwipeRow leftOpenValue={150} rightOpenValue={-150}>
      <View style={styles.standaloneRowBack}>
        <Text></Text>
        <Text></Text>
      </View>

      <ListItem
        style={{
          paddingRight: 2
        }}
        key={i}
        chevron
        bottomDivider
        title={this.personTemplate(i)}
      />
    </SwipeRow>
  );
};

export default function Patients() {  
  return <Text>patients</Text>;
}
