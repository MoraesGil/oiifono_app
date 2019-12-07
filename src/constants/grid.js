import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  spaced: {
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  centerH: {
    alignItems: "center"
  },
  containerMini: {
    marginRight: 3,
    marginLeft: 3
  },
  containerMini2x: {
    marginRight: 6,
    marginLeft: 6
  },
  pleft: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pright: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  divider: { backgroundColor: "#ccc" },
  p5: { padding: 5 },
  p10: { padding: 10 },
  m10: { margin: 10 }
});
