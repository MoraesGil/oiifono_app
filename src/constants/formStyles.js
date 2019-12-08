import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import colors from "@/constants/Colors";

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
  },
  button: {
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.dangerBorder
  },
  cancelText: {
    color: colors.dangerText
  },
  bottomContainer: {
    justifyContent: "flex-end"
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#c7c6c1"
  },
  inputLabel: {
    fontSize: 16,
    color: "#86939e",
    fontWeight: "bold"
  },
  inputError: {
    margin: 5,
    fontSize: 12,
    color: "#ff190c"
  },
  iconContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});
