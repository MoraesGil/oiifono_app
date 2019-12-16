import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import { Button, ListItem, Avatar } from "react-native-elements";

import styles from "./styles";
import agendaDemo from "assets/agendaDemo.png";

export default function Settings({ navigation }) {
  const user = useSelector(state => state.auth.me);

  function initialsLetterName(name) {
    let first = name.split(" ")[0][0];
    let last = name
      .split(" ")
      .slice(-1)
      .join(" ")[0];
    return (first + last).toUpperCase();
  }

  function renderBottomButons() {
    return (
      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            navigation.navigate("PasswordUpdate", { user });
          }}
          title="Alterar Senha"
        />
        <Button
          buttonStyle={[styles.button, styles.cancelButton]}
          titleStyle={styles.cancelText}
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate("Login");
          }}
          title="Sair da conta"
        />
      </View>
    );
  }

  if (user === null)
    return (
      <View style={[styles.container, styles.center, styles.centerH]}>
        <ScrollView style={[styles.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
        </ScrollView>
        {renderBottomButons()}
      </View>
    );

  return (
    <View style={[styles.container]}>
      <ScrollView style={[styles.container]}>
        <ListItem
          chevron
          onPress={() => {
            navigation.navigate("ProfileUpdate", { user });
          }}
          title={
            <View style={styles.center}>
              <Avatar
                rounded
                size="large"
                title={initialsLetterName(user.name)}
                source={{ uri: user.picture || null }}
              />
              <Text>{user.name}</Text>
              <Text>CRF-a: {user.register}</Text>
            </View>
          }
          bottomDivider
        />
        <View style={styles.center}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Availabilities", { user });
            }}
          >
            <Image
              source={agendaDemo}
              resizeMode="cover"
              style={{
                borderColor: "#ccc",
                shadowColor: "#ccc",
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
      </ScrollView>
      {renderBottomButons()}
    </View>
  );
}
