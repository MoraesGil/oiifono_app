import React, { useState } from "react";
import { Button, Input, Icon, Divider, CheckBox } from "react-native-elements";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

export default function Form({ navigation }) {
  const _schedule = useSelector(
    state => state.data.schedules.items[navigation.getParam("schedule_id")]
  );   
  const [errors, setErros] = useState({});
  const [schedule, setSchedule] = useState(_schedule || {});

  function saveChangesHandle(){
    console.log('saveChangesHandle')
    console.log(patient)
  }

  return (
    <SafeAreaView style={[styles.container, styles.containerMini]}>
      <ScrollView style={styles.container}>
         
        
      </ScrollView>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title={schedule.id ? "Atualizar" : "Agendar"}
          onPress={saveChangesHandle}
        />
        <Button
          buttonStyle={[styles.button, styles.cancelButton]}
          titleStyle={styles.cancelText}
          title="Cancelar"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
}
