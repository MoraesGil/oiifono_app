import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import styles from "./styles";

export default function ProfileUpdate({ navigation }) {
  const user = navigation.getParam("user") || useSelector(state => state.data.auth.user);

  const [profile, setProfile] = useState({
    name: user.person.name,
    crfa: user.person.doctor.crfa,
    cnpj: user.person.company.cnpj,
    ie: user.person.company.ie
  });

  const [errors, setErros] = useState({});

  function saveHandle() {} 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Input
          label="CRF-a"
          leftIcon={
            <Icon
              name="id-card"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          value={profile.crfa}
          maxLength={6}
          keyboardAppearance="light"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          placeholder={"Me preenche vai ;)"}
          onChangeText={input => {
            if (/^\d+$/.test(input) || input === "")
              setProfile({
                ...profile,
                ...{ crfa: input }
              });
          }}
          errorMessage={errors.crfa}
        />

        <Input
          label="Nome completo."
          leftIcon={
            <Icon
              name="user"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          value={profile.name}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          placeholder={"Não me deixe em branco =/"}
          onChangeText={input => setProfile({ ...profile, ...{ name: input } })}
          errorMessage={errors.name}
        />
      </ScrollView>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title="Atualizar"
          onPress={saveHandle}
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
