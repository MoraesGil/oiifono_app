import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Platform,
  Image,
  AsyncStorage,
  Alert
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import logo from "assets/logo.png";
import api from "@/services/api";
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

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      Crfa: "",
      email: "",
      password: "",
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      errorsMessages: {}
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.checkToken = this.checkToken.bind(this);

    this.checkToken();
  }

  checkToken() {
    AsyncStorage.getItem("@oiiFono:token").then(token => {
      if (token) {
        this.props.navigation.navigate("Tabs");
      }
    });
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isCrfaValid: true,
      isNameValid: true,
      errorsMessages: {}
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async login() {
    if (this.state.isLoading) return false;

    const { email, password } = this.state;
    const payload = { email, password };

    this.setState({ isLoading: true });
    LayoutAnimation.easeInEaseOut();
    await this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 6 || this.passwordInput.shake()
    });
    this.setState({ isLoading: false });

    if (this.state.isEmailValid && this.state.isPasswordValid) {
      try {
        this.setState({ isLoading: true });
        const response = await api.post("/login", payload);
        const { user, access_token, expires_in } = response.data;
        await AsyncStorage.setItem("@oiiFono:token", access_token);
      } catch (error) {
        Alert.alert(
          "Falha no login",
          "login ou senha inválidos",
          [{ text: "OK" }],
          {
            cancelable: false
          }
        );
      } finally {
        this.checkToken();
        this.setState({ isLoading: false });
      }
    }
  }

  async signUp() {
    if (this.state.isLoading) return false;
    const { name, email, password, passwordConfirmation, Crfa } = this.state;

    this.setState({ isLoading: true });
    const password_confirmation = passwordConfirmation;
    const register = Crfa;
    const payload = { name, email, password, password_confirmation, register };

    try {
      const response = await api.post("/register", payload);
      const { user, access_token, expires_in } = response.data;
      await AsyncStorage.setItem("@oiiFono:token", access_token);
    } catch (e) {
      this.setState({ errorsMessages: e.response.data.errors });

      this.setState({
        isLoading: false,
        isEmailValid:
          !this.state.errorsMessages.email || this.emailInput.shake(),
        isPasswordValid:
          !this.state.errorsMessages.password || this.passwordInput.shake(),
        isCrfaValid:
          !this.state.errorsMessages.password || this.CrfaInput.shake(),
        isNameValid: !this.state.errorsMessages.name || this.NameInput.shake(),
        isConfirmationValid:
          password === passwordConfirmation || this.confirmationInput.shake()
      });
    } finally {
      this.setState({ errorsMessages: {} });
      this.setState({ isLoading: false });
      this.checkToken();
    }
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      isCrfaValid,
      isNameValid,
      email,
      password,
      passwordConfirmation,
      Crfa,
      name,
      errorsMessages
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

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
                <View
                  style={{ marginTop: -10, marginLeft: 10, marginBottom: 50 }}
                >
                  <Image
                    source={logo}
                    style={{
                      shadowColor: "#fff",
                      shadowOffset: {
                        width: 0,
                        height: 1
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 7.0
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button
                  disabled={isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  containerStyle={{ flex: 1 }}
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
                  onPress={() => this.selectCategory(1)}
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
                    leftIcon={
                      <Icon
                        name="user"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={name}
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
                    ref={input => (this.NameInput = input)}
                    onSubmitEditing={this.signUp}
                    onChangeText={name => {
                      this.setState({ name });
                    }}
                    errorMessage={
                      isNameValid
                        ? null
                        : errorsMessages.name || "Seu nome é obrigatório"
                    }
                  />
                )}

                {isSignUpPage && (
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
                    value={Crfa}
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
                    ref={input => (this.CrfaInput = input)}
                    onSubmitEditing={this.signUp}
                    onChangeText={Crfa => {
                      if (Crfa.length == 6) this.emailInput.focus();
                      if (/^\d+$/.test(Crfa) || Crfa === "")
                        this.setState({ Crfa });
                    }}
                    errorMessage={
                      isCrfaValid 
                        ? null
                        : (
                            errorsMessages.register ||
                            "Digite apenas os 6 números do seu CRF-a"
                          ).replace("register", "CRF-a")
                    }
                  />
                )}

                <Input
                  leftIcon={
                    <Icon
                      name="envelope-o"
                      type="font-awesome"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                  value={email}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={styles.inputWithIcon}
                  placeholder={"Email"}
                  containerStyle={styles.inputContainer}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => this.setState({ email })}
                  errorMessage={
                    isEmailValid
                      ? null
                      : errorsMessages.email || "Digite um e-mail válido."
                  }
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
                  value={password}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType={isSignUpPage ? "next" : "done"}
                  blurOnSubmit={true}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputWithIcon}
                  placeholder={"Senha"}
                  ref={input => (this.passwordInput = input)}
                  onSubmitEditing={() =>
                    isSignUpPage ? this.confirmationInput.focus() : this.login()
                  }
                  onChangeText={password => this.setState({ password })}
                  errorMessage={isPasswordValid ? null : "Minimo 6 caracteres"}
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
                    value={passwordConfirmation}
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
                    ref={input => (this.confirmationInput = input)}
                    onSubmitEditing={this.signUp}
                    onChangeText={passwordConfirmation =>
                      this.setState({ passwordConfirmation })
                    }
                    errorMessage={
                      isConfirmationValid
                        ? null
                        : "Confirmação de senha não confere."
                    }
                  />
                )}
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  activeOpacity={0.8}
                  title={isLoginPage ? "LOGIN" : "Registrar"}
                  onPress={isLoginPage ? this.login : this.signUp}
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
}

export default withNavigation(LoginScreen);
