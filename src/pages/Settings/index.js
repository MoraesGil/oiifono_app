import React, { Component, useState } from "react"; 
import { View, Image, TouchableOpacity } from "react-native"; 
import { useSelector } from "react-redux";
import { Button, ListItem } from "react-native-elements";

import api from "@/services/api";

import styles from "./styles";
import agendaDemo from "assets/agendaDemo.png";

import {
  Autocomplete,
  withKeyboardAwareScrollView
} from "react-native-dropdown-autocomplete";

export default function Settings({ navigation }) {
  const user = useSelector(state => state.data.auth.user);

  return (
    <View style={[styles.container]}>
      <ListItem
        chevron
        onPress={() => {
          navigation.navigate("UserForm", { user });
        }}
        leftAvatar={{ source: { uri: user.person.picture } }}
        title={user.person.name}
        subtitle={"CRF-a: " + user.person.crfa}
        bottomDivider
      />
      <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Availabilities", { user });
          }}
        >
          <Image
            source={agendaDemo}
            style={{
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowOpacity: 0.5,
              shadowRadius: 7.0
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            navigation.navigate("UserPasswordForm", { user });
          }}
          title="Alterar Senha"
        />
        <Button
          buttonStyle={styles.button}
          onPress={() => alert("logout")}
          title="Sair da conta"
        />
      </View>
    </View>
  );
}
