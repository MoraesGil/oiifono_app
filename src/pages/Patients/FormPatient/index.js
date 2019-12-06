import React, { Component, useState } from "react";

import { View, Text } from "react-native";

import styles from "./styles";

export default function FormPatient({ navigation }) {
  const _patient = useSelector(
    state => state.data.patients.items[navigation.getParam("patient_id") || 1]
  );

  const [patient, setPatient] = useState(_patient || {});

  function saveChangesHandle(){
    console.log('saveChangesHandle')
    console.log(patient)
  }

  return (
    <View style={[styles.container, styles.containerMini]}>
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
          value={patient.name}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ name: input } })}
          errorMessage={errors.name}
        />

        <Input
          leftIcon={
            <Icon
              name="wheelchair"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          label="Necessidades especiais."
          value={patient.disability}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input =>
            setPatient({ ...patient, ...{ disability: input } })
          }
          errorMessage={errors.name}
        />
        <Divider style={styles.divider} />
        <Input
          leftIcon={
            <Icon
              name="id-card"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          label="RG"
          value={patient.rg}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ rg: input } })}
          errorMessage={errors.rg}
        />
        <Input
          leftIcon={
            <Icon
              name="id-card"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          label="CPF"
          value={patient.rg}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ cpf: input } })}
          errorMessage={errors.cpf}
        />
      </ScrollView>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title={ patient.id ? "Atualizar" : "Cadastrar"}
          onPress={saveChangesHandle}
        />
        <Button
          buttonStyle={[styles.button, styles.cancelButton]}
          titleStyle={styles.cancelText}
          title="Cancelar"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
