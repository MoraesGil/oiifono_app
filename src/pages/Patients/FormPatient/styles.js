import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({
  genderCheckContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  }
});

export default { ...grid, ...formStyles, ...styles }; 