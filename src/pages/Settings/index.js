import React from "react"; 
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native"; 
import { useSelector } from "react-redux";
import { Button, ListItem, Avatar } from "react-native-elements";
 
import styles from "./styles";
import agendaDemo from "assets/agendaDemo.png";
 
export default function Settings({ navigation }) {
  const user = useSelector(state => state.data.auth.user);

  function initialsLetterName(name){
    let first = name.split(' ')[0][0]
    let last = name.split(' ').slice(-1).join(' ')[0]
    return (first+last).toUpperCase()
  }

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
                title={initialsLetterName(user.person.name)}
                source={{ uri: user.person.picture || null }}
              />
              <Text>{user.person.name}</Text>
              <Text>CRF-a: {user.person.doctor.crfa}</Text>
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
          onPress={() => alert("logout")}
          title="Sair da conta"
        />
      </View>
    </View>
  );
}
