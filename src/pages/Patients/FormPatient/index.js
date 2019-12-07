import React, { useState } from "react";
import { Button, Input, Icon, Divider, CheckBox } from "react-native-elements";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

export default function FormPatient({ navigation }) {
  const _patient = useSelector(
    state => state.data.patients.items[navigation.getParam("patient_id")]
  );  

  const [errors, setErros] = useState({});
  const [patient, setPatient] = useState(_patient || {gender:"m"});

  function saveChangesHandle(){
    console.log('saveChangesHandle')
    console.log(patient)
  }

  return (
    <SafeAreaView style={[styles.container, styles.containerMini]}>
      <ScrollView style={styles.container}>
        <View style={[styles.container, styles.center]}>
          <View style={styles.row}>
            <CheckBox
              center
              title="Masculino"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={patient.gender == "m"}
              containerStyle={styles.genderCheckContainer}
              onPress={() => setPatient({ ...patient, ...{ gender: "m" } })}
            />
            <CheckBox
              center
              title="Feminino"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={patient.gender == "f"}
              containerStyle={styles.genderCheckContainer}
              onPress={() => setPatient({ ...patient, ...{ gender: "f" } })}
            />
          </View>
        </View>
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
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ name: input } })}
          errorMessage={errors.name}
          placeholder="Obrigatório"
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
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input =>
            setPatient({ ...patient, ...{ disability: input } })
          }
          errorMessage={errors.name}
          placeholder="opicional"
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
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ rg: input } })}
          errorMessage={errors.rg}
          placeholder="opicional"
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
          value={patient.cpf}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setPatient({ ...patient, ...{ cpf: input } })}
          errorMessage={errors.cpf}
          placeholder="opicional"
        />
      </ScrollView>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title={patient.id ? "Atualizar" : "Cadastrar"}
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
