import { StyleSheet } from "react-native";
import grid from "@/constants/grid";
import formStyles from "@/constants/formStyles";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  
});

export const TouchBtn = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
`;


export default { ...grid, ...formStyles, ...styles }; 