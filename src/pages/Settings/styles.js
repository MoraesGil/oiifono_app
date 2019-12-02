import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  button: {
    marginBottom: 10
  }
});

export default { ...grid, ...formStyles, ...styles };
