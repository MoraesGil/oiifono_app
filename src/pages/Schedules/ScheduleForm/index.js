import React, { useState, useEffect } from "react";
import { Button, Input, Icon, Divider, CheckBox } from "react-native-elements";
import { View, ScrollView, SafeAreaView, AsyncStorage } from "react-native";
import { useSelector } from "react-redux";
import styles, { TouchBtn } from "./styles";
import DateInput from "components/DateInput";
import RangeTimeInput from "components/RangeTimeInput";
import moment from "moment";

export default function Form({ navigation }) {
  const [errors, setErros] = useState({});
  const [schedule, setSchedule] = useState({});
  const [patient, setPatient] = useState({});
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({
    start_at: "",
    end_at: ""
  });

  useEffect(() => {
    if (navigation.getParam("schedule")) {
      setSchedule(navigation.getParam("schedule"));
      // const _patient = _patients[_schedule.patient_id];
      setDate(new Date(moment(schedule.date).format()));
    }
  }, []);

  function saveChangesHandle() {
    // console.log("saveChangesHandle");
    // console.log(date);
    // console.log(timeRange);
    // console.log(patient);
    // console.log(schedule);
  }

  return (
    <SafeAreaView style={[styles.container, styles.containerMini]}>
      <ScrollView style={styles.container}>
        <TouchBtn onPress={() => alert("abrir select")}>
          <Input
            pointerEvents="none"
            leftIcon={
              <Icon
                name="user"
                type="font-awesome"
                color="rgba(0, 0, 0, 0.38)"
                size={25}
                style={{ backgroundColor: "transparent" }}
              />
            }
            editable={false}
            label="Paciente"
            placeholder="Escolher um paciente"
            value={patient.name}
            inputStyle={styles.inputWithIcon}
            // errorMessage={error}
          />
        </TouchBtn>
        <DateInput
          minDate={new Date()}
          date={date}
          onChange={setDate}
          error="erro mano"
          label="Data da consulta"
          isValid={valid => console.log(valid)}
          error={errors.date}
        />
        <RangeTimeInput
          timeRange={timeRange}
          label="Horário de atendimento"
          placeholder="Informe o horário"
          onChange={setTimeRange}
          error={errors.start_at}
        />
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
