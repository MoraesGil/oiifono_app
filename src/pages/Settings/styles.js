import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: "flex-end"
  },
  button: {
    marginBottom: 10
  },
  centered: {
    flex: 1,
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5
  }
});

export default { ...grid, ...formStyles, ...styles };
