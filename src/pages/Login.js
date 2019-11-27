import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
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
import api from "../services/api";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/bg_login.jpg");

// Enable LayoutAnimation on Android
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
      Crfa: "",
      email: "",
      password: "",
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);

    AsyncStorage.getItem("token").then(token => {
      if (token) {
        this.props.navigation.navigate("Home");
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
      errorsMessages:{}
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // setTimeout(() => {
    LayoutAnimation.easeInEaseOut();
    await this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 6 || this.passwordInput.shake()
    });
    // }, 500);

    if (this.state.isEmailValid && this.state.isPasswordValid) {
      this.setState({ isLoading: true });
      api
        .post("/login", { email, password })
        .then(res => {
          const { user, access_token, expires_in } = res.data; 

          AsyncStorage.multiSet([
            ["@oiiFono:token", access_token],
            ["@oiiFono:expires_in", expires_in],
            ["@oiiFono:user", JSON.stringify(user)],
          ]);

        })
        .catch(e => {
          Alert.alert(
            "Falha no login",
            "login ou senha inválidos",
            [{ text: "OK" }],
            {
              cancelable: false
            }
          );
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  signUp() {
    const { email, password, passwordConfirmation, Crfa } = this.state;

    this.setState({ isLoading: true });
    // first simulation
    // setTimeout(() => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      isLoading: false,
      isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      isCrfaValid: Crfa.length == 6 || this.CrfaInput.shake(),
      isConfirmationValid:
        password === passwordConfirmation || this.confirmationInput.shake()
    });
    // }, 1000);

    if (
      this.state.isEmailValid &&
      this.state.isPasswordValid &&
      this.state.isConfirmationValid &&
      this.state.isCrfaValid
    ) {
      this.setState({ isLoading: true });
      
      const password_confirmation = passwordConfirmation
      const register = Crfa
      api
        .post("/register", { email, password, password_confirmation, register })
        .then(res => {
          const { user } = res.data;
          AsyncStorage.setItem("user", user);
        })
        .catch(e => {
          if (error.response) {
            this.setState({
              isLoading: false,
              isCrfaValid:
                !error.response.data.errors.register || this.CrfaInput.shake(),
              isEmailValid:
                !error.response.data.errors.email || this.emailInput.shake(),
              isPasswordValid:
                !error.response.data.errors.password ||
                this.passwordInput.shake(), 
              isConfirmationValid:
                !error.response.data.errors.password_confirmation ||
                this.confirmationInput.shake(),
              errorsMessages: error.response.data.errors || {}
            });
          } else {
            Alert.alert(
              "Erro no servidor",
              "Aguarde alguns instantes e tente novamente",
              [{ text: "OK" }],
              {
                cancelable: false
              }
            );
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
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
      email,
      password,
      passwordConfirmation,
      Crfa
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
                        name="id-card"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    }
                    value={Crfa}
                    autoFocus={true}
                    maxLength={6}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                    returnKeyType="next"
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={"Crf-a"}
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
                        : errorsMessages.register
                        ? errorsMessages.register[0]
                        : "Digite apenas os 6 números do seu Crf-a"
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
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Email"}
                  containerStyle={{
                    borderBottomColor: "rgba(0, 0, 0, 0.38)"
                  }}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => this.setState({ email })}
                  errorMessage={
                    isEmailValid ? null : (errorsMessages.email
                        ? "Este e-mail já está sendo usado."
                        : "Digite um e-mail válido.")
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
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: "rgba(0, 0, 0, 0.38)"
                  }}
                  inputStyle={{ marginLeft: 10 }}
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
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }}
                    inputStyle={{ marginLeft: 10 }}
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
                  titleStyle={styles.loginTextButton}
                  loading={isLoading}
                  disabled={isLoading}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center"
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: "rgb(56, 126, 245)",
    borderRadius: 10,
    height: 50,
    width: 200
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular"
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});
