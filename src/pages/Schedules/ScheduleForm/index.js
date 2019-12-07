import React, { useState } from "react";
import { Button, Input, Icon, Divider, CheckBox } from "react-native-elements";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import DateInput from "components/DateInput";

export default function Form({ navigation }) {
  const _schedule = useSelector(
    state => state.data.schedules.items[navigation.getParam("schedule_id")]
  );   
  const [errors, setErros] = useState({});
  const [schedule, setSchedule] = useState(_schedule || {});
 const [date, setDate] = useState(new Date());
  function saveChangesHandle(){
    console.log('saveChangesHandle')
    console.log(date)
    console.log(schedule);
  }

  return (
    <SafeAreaView style={[styles.container, styles.containerMini]}>
      <ScrollView style={styles.container}>
        <Input
          leftIcon={
            <Icon
              name="user"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          label="Nome completo."
          value={schedule.name}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          errorMessage={errors.name}
          placeholder="Obrigatório"
        />

        <DateInput date={date} onChange={setDate} error="" label="Data" />
        
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
