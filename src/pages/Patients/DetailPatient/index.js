import React, { Component, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, ListItem, Avatar, Divider,Icon } from "react-native-elements";
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
          <View style={[styles.row, styles.p10, styles.centerH]} key={i}>
            <Icon
              name={item.type == 0 ? "envelope" : "mobile"}
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)" 
              containerStyle={[styles.centerH,{ backgroundColor: "transparent", marginEnd: 15 }]}
            />
            <Text>{item.description}</Text>
          </View>
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
            rightTitleStyle={{ width: 150 }}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.containerMini]}>
      <ScrollView styles="container">
        <View style={[styles.container, styles.row, styles.p10]}>
          <View style={[styles.center]}>
            <View style={[styles.row, styles.center, styles.p10]}>
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
                  icon={{
                    name: "line-chart",
                    type: "font-awesome",
                    color: "#CCC"
                  }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Evoluções</Text>
              </View>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{
                    name: "page-export-pdf",
                    type: "foundation",
                    color: "#CCC"
                  }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Exportar</Text>
              </View>
            </View>
            <View style={[styles.row, styles.centerH]}>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{
                    name: "calendar",
                    type: "font-awesome",
                    color: "#CCC"
                  }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Agendamentos</Text>
              </View>
              <View style={[styles.centerH, styles.container]}>
                <Avatar
                  size="large"
                  activeOpacity={0.7}
                  overlayContainerStyle={styles.menuIconOverlay}
                  icon={{
                    name: "stethoscope",
                    type: "font-awesome",
                    color: "#CCC"
                  }}
                  onPress={() => console.log("Works!")}
                />
                <Text>Terapias</Text>
              </View>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Text>Dados pessoais</Text>
        <ListItem
          key={0}
          leftIcon={{ name: "id-card", type: "font-awesome", color: "#CCC" }}
          title={
            <View styles={[styles.row, styles.p10]}>
              <Text> Paciente: {patient.name}</Text>
              <View style={styles.row}>
                <Text> Nascido em : {patient.birthdate}</Text>
              </View>
            </View>
          }
          chevron
          onPress={() =>
            navigation.navigate("patient_form", { patient_id: patient.id })
          }
        />
        <Divider style={styles.divider} />
        <Text>Endereços</Text>
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
            onPress={() =>
              navigation.navigate("patient_form", { patient_id: patient.id })
            }
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
