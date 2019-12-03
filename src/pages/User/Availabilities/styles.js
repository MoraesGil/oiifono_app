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
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backRightBtn: {
    ...{
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      top: 0,
      width: 75
    },
    ...grid.container
  }
});

export default { ...grid, ...formStyles, ...styles }; 