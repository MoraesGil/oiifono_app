import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";
import colors from "@/constants/Colors";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  backTextWhite: {
    color: "#FFF"
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
  },

  absenceBtn: {
    backgroundColor: colors.dangerBackground
  },
  absenceBtnText: {
    color: colors.dangerText
  },

  rescheduleBtn: {
    backgroundColor: colors.infoBackground
  },
  rescheduleBtnText: {
    color: colors.infoText
  },

  confirmBtn: {
    backgroundColor: colors.primaryBackground
  },
  confirmBtnText: {
    color: colors.primaryText
  },

  attendBtn: {
    backgroundColor: colors.successBackground
  },
  attendBtnText: {
    color: colors.successText
  }
});

export default { ...grid, ...formStyles, ...styles};
