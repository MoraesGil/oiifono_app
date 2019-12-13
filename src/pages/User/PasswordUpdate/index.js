import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Button, Input, Icon, } from "react-native-elements";

import styles from "./styles";

export default function PasswordUpdate({ navigation }) {
  const user = navigation.getParam("user");

  const [password, setPassword] = useState({
    old_password: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErros] = useState({});

  function savePasswordHandle() {
     alert("senha atualizada");
  }
 

  return (
    <SafeAreaView style={[styles.container, styles.containerMini]}>
      <ScrollView style={styles.container}>
        <Input
          label="Senha antiga"
          leftIcon={
            <Icon
              name="lock"
              type="simple-line-icon"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          value={password.old_password}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          placeholder={"Senha Anterior"}
          onChangeText={input =>
            setPassword({ ...password, ...{ old_password: input } })
          }
          errorMessage={errors.old_password}
        />

        <Input
          label="Nova senha"
          leftIcon={
            <Icon
              name="lock"
              type="simple-line-icon"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          value={password.password}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          placeholder={"Senha Nova"}
          onChangeText={input =>
            setPassword({ ...password, ...{ password: input } })
          }
          errorMessage={errors.password}
        />

        <Input
          label="Confirme a senha"
          leftIcon={
            <Icon
              name="lock"
              type="simple-line-icon"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          value={password.password_confirmation}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          placeholder={"Confirma senha nova"}
          onChangeText={input =>
            setPassword({
              ...password,
              ...{ password_confirmation: input }
            })
          }
          errorMessage={errors.password_confirmation}
        />
      </ScrollView>

      <View style={[styles.bottomContainer, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title="Atualizar senha"
          onPress={savePasswordHandle}
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
