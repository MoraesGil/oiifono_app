import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Input, Icon } from "react-native-elements";

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
    if (validate()) alert("senha atualizada"); 
  }

  function validate() {
    let validation = errors;

    if (password.old_password.length < 6)
      validation = {
        ...validation,
        ...{ old_password: "Informe a senha anterior corretamente" }
      };

    if (password.password.length < 6)
      validation = {
        ...validation,
        ...{ password: "Minimo 6 caracteres" }
      };

    if (password.password_confirmation != password.password)
      validation = {
        ...validation,
        ...{ password_confirmation: "Senha não confere" }
      };

    setErros({
      ...errors,
      ...validation
    });  
    return validation === {};
  }

  return (
    <View style={[styles.container]}>
      <Input
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

      <View style={[styles.container, styles.containerMini]}>
        <Button
          buttonStyle={styles.button}
          title="Atualizar senha"
          onPress={savePasswordHandle}
        />
      </View>
    </View>
  );
}
