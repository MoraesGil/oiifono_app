import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import logo from "assets/logo.png";
import styles from "./styles"; 
const BG_IMAGE = require("assets/bg_login.jpg");
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const isLoginPage = tab === 0;
  const isSignUpPage = tab === 1;
  const isLoading = useSelector(state => state.auth.loading);
  const [errors, setErrors] = useState({});

  const [profile, setProfile] = useState({
    name: "",
    register: "", //crfa
    email: "",
    password: "",
    password_confirmation: ""
  });

  function handleSignIn() {
    dispatch(signInRequest(email, password));
    console.log("entrar", ({ email, password } = profile));
  }

  function handleSignUp() {
    console.log("registrar");
  }

  function selectCategory(index) {
    LayoutAnimation.easeInEaseOut(); 
    setTab(index);
     
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enable={Platform.OS === "ios"}
      style={styles.container}
    >
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        <View>
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <View style={styles.titleContainer}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>
            </View>
            <View style={styles.row}>
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => selectCategory(0)}
                containerStyle={styles.container}
                titleStyle={[
                  styles.categoryText,
                  isLoginPage && styles.selectedCategoryText
                ]}
                title={"Login"}
              />
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => selectCategory(1)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isSignUpPage && styles.selectedCategoryText
                ]}
                title={"Cadastre-se"}
              />
            </View>

            <View style={styles.rowSelector}>
              <TabSelector selected={isLoginPage} />
              <TabSelector selected={isSignUpPage} />
            </View>

            <View style={styles.formContainer}>
              {isSignUpPage && (
                <Input
                  errorMessage={errors.name}
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
                  autoFocus={true}
                  maxLength={40}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputWithIcon}
                  placeholder={"Seu nome"}
                  onChangeText={input => {
                    setProfile({ ...profile, ...{ name: input } });
                  }}
                />
              )}

              {isSignUpPage && (
                <Input
                  errorMessage={errors.register}
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
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputWithIcon}
                  placeholder={"CRF-a"}
                  onChangeText={input => {
                    if (/^\d+$/.test(input) || input === "")
                      setProfile({ ...profile, register: input });
                  }}
                />
              )}

              <Input
                errorMessage={errors.email}
                leftIcon={
                  <Icon
                    name="envelope-o"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: "transparent" }}
                  />
                }
                value={profile.email}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                inputStyle={styles.inputWithIcon}
                placeholder={"Email"}
                containerStyle={styles.inputContainer}
                onChangeText={input => {
                  setProfile({ ...profile, ...{ email: input } });
                }}
              />

              <Input
                errorMessage={errors.password}
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: "transparent" }}
                  />
                }
                value={profile.password}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType={isSignUpPage ? "next" : "done"}
                blurOnSubmit={true}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputWithIcon}
                placeholder={"Senha"}
                onChangeText={input => {
                  setProfile({ ...profile, ...{ password: input } });
                }}
              />
              {isSignUpPage && (
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
                  value={profile.password_confirmation}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType={"done"}
                  blurOnSubmit={true}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputWithIcon}
                  placeholder={"Confirme a senha"}
                  onChangeText={input => {
                    setProfile({
                      ...profile,
                      ...{ password_confirmation: input }
                    });
                  }}
                />
              )}
              <Button
                buttonStyle={styles.loginButton}
                containerStyle={{ marginTop: 32, flex: 0 }}
                activeOpacity={0.8}
                title={isLoginPage ? "Entrar" : "Registrar"}
                onPress={isLoginPage ? handleSignIn : handleSignUp}
                titleStyle={styles.submitButton}
                loading={isLoading}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
