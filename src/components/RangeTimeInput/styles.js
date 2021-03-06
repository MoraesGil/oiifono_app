import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";
import colors from "@/constants/Colors";

const styles = StyleSheet.create({
  deleteBtn: {
    color: colors.dangerText
  },
  deleteBtnText: {
    color: colors.dangerText
  }
});

export default { ...grid, ...formStyles, ...styles }; 