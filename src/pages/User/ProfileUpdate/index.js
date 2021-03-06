import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import styles from "./styles";

export default function ProfileUpdate({ navigation }) {
  const user = navigation.getParam("user");

  const [profile, setProfile] = useState(user);

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
          value={profile.register}
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
                ...{ register: input }
              });
          }}
          errorMessage={errors.register}
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
          value={profile.cpf}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setProfile({ ...profile, ...{ cpf: input } })}
          errorMessage={errors.cpf}
          placeholder="recomendado"
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
          label="CNPJ"
          value={profile.cnpj}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={true}
          inputStyle={styles.inputWithIcon}
          onChangeText={input => setProfile({ ...profile, ...{ cnpj: input } })}
          errorMessage={errors.cnpj}
          placeholder="recomendado"
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
