import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({ 
  button: {
    marginBottom: 10,
    marginTop: 10
  }
});

export default { ...grid, ...formStyles, ...styles };
