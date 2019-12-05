import React, { Component, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, ListItem, Avatar, Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import StatusIcon from "components/StatusIcon.js";
import styles from "./styles";  

export default function DetailPatient({ navigation }) {
   
  const _patient = useSelector(
    state => state.data.patients.items[navigation.getParam("patient_id") || 1]
  );

  const [patient, setPatient] = useState(_patient);

  const contacts = [
    {
      description: "Teste@test.com",
      type: 0
    },
    {
      description: "(18)997998999",
      type: 1
    },
    {
      description: "(18)32224455",
      type: 1
    }
  ];

  const relatives = [
    {
      name: "Ana Maria",
      contact: "(18)997998999"
    },
    {
      name: "José ",
      contact: "(18)997998999"
    }
  ];

  function contactsTemplate() {
    
    return (
      <View>
        {contacts.map((item, i) => ( 
          <ListItem
            key={i}
            title={item.description}
            leftIcon={{
              name: item.type == 0 ? "envelope" : "mobile",
              type: "font-awesome"
            }}
            bottomDivider
          />
        ))}
      </View>
    );
  }

  function parentescolTemplate() {
    return (
      <View>
        {relatives.map((item, i) => (
          <ListItem
            key={i}
            title={item.name}
            rightTitle={item.contact}
            rightTitleStyle={{width:150}}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.containerMini]}>
      <ScrollView styles="container">
        <View style={[styles.container, styles.row, styles.p10]}>
          <View style={[styles.centered]}>
            <View style={[styles.row, styles.centered, styles.p10]}>
              {StatusIcon("gender", patient.gender)}
              {patient.disability &&
                StatusIcon("desability", patient.disability)}
              {patient.birthday != false && StatusIcon("birthday")}
              <Text style={{ marginLeft: 20 }}> {patient.age} </Text>
            </View>
            <Avatar
              size="xlarge"
              source={{
                uri: patient.picture
              }}
            />
          </View>
          <View style={[styles.container]}>
            <View style={[styles.row, styles.centerH, styles.p10]}>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{ name: "user", type: "font-awesome", color: "#CCC" }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Evoluções</Text>
              </View>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{ name: "user", type: "font-awesome", color: "#CCC" }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Exportar Ficha</Text>
              </View>
            </View>
            <View style={[styles.row, styles.centerH]}>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{ name: "user", type: "font-awesome", color: "#CCC" }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Evoluções</Text>
              </View>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{ name: "user", type: "font-awesome", color: "#CCC" }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Exportar Ficha</Text>
              </View>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View styles={[styles.row, styles.p10]}>
          <Text h4> Paciente: {patient.name}</Text>
          <View style={styles.row}>
            <Text h4> Nascido em : {patient.birthdate}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />

        <View>
          <ListItem
            leftIcon={{ name: "location-pin", type: "entypo", color: "#CCC" }}
            title={
              <View style={[styles.container, styles.row]}>
                <View style={styles.p10}>
                  <Text>Rua da saudade, 231</Text>
                  <Text>Pindamoiangaba</Text>
                </View>
                <View style={styles.p10}>
                  <Text>centro</Text>
                  <Text>CEP: 29.019-000</Text>
                </View>
              </View>
            }
            chevron
            onPress={() => console.log("join addresslist!")}
          />
        </View>
        <Divider style={styles.divider} />
        <Text>Contatos pessoais</Text>
        <View>
          <ListItem
            title={contactsTemplate()}
            chevron
            onPress={() => console.log("join contact list!")}
          />
        </View>
        <Divider style={styles.divider} />
        <Text>Outros Contatos</Text>
        <View>
          <ListItem
            title={parentescolTemplate()}
            chevron
            onPress={() => console.log("join contact list!")}
          />
        </View>
        <Divider style={styles.divider} />
      </ScrollView>
    </View>
  );
}
