import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  submitButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  inputWithIcon: {
    marginLeft: 10
  },
  inputContainer: {
    marginTop: 16
  }
});
