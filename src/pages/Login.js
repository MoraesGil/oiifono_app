import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";

import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider
} from "react-native-elements";

import logo from "assets/logo.png";
import { TextInput } from "react-native-gesture-handler";
import api from "../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassWord] = useState("");

  useEffect(() => {
    // AsyncStorage
    //     .getItem('user')
    //     .then(user => {
    //         if (user) {
    //             AsyncStorage.clear(); //logout
    //             navigation.navigate('Home')
    //         }
    //     })
  }, []);

  async function handleSubmit() {
    // const response = await api.post('/login',{     email,     password }) const
    // {user} = response.data

    // await AsyncStorage.setItem('user', 1)
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enable={Platform.OS === "ios"}
      style={styles.container}
    >
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>Seu e-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          autoCorrect={false}
          secureTextEntry
          returnKeyType="go"
          autoCorrect={false}
          value={password}
          onChangeText={setPassWord}
        />

        <Button
          title="Entrar"
          buttonStyle={styles.button}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "rgb(56, 126, 245)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
