import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    marginVertical: 20
  }
});

export default { ...grid, ...formStyles, ...styles }; 