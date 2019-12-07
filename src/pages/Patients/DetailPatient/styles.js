import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";

const styles = StyleSheet.create({
  menuIconOverlay: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  boxContainer: {
    ...grid.container,
    ...grid.center,
    ...grid.row
  },
  insideBox: { position: "absolute", bottom: 10 }
});

export default { ...grid, ...formStyles, ...styles };
