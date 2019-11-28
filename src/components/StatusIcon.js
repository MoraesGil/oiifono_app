import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Tooltip } from "react-native-elements";
import colors from "@/constants/Colors";
import grid from "@/constants/grid";


function sex(sex) {
  <Tooltip popover={<Text> {sex == "m" ? "Masculino" : "Feminino"} </Text>}>
    <Ionicons
      style={grid.containerMini2x}
      name={i.person.sex == "m" ? "md-man" : "md-woman"}
      size={26}
      color={i.person.sex == "m" ? colors.male : colors.female}
    />
  </Tooltip>;
}

function sex(sex) {
  <Tooltip popover={<Text> {sex == "m" ? "Masculino" : "Feminino"} </Text>}>
    <Ionicons
      style={grid.containerMini2x}
      name={i.person.sex == "m" ? "md-man" : "md-woman"}
      size={26}
      color={i.person.sex == "m" ? colors.male : colors.female}
    />
  </Tooltip>;
}

function desabilities(disability) {
  return (
    <Tooltip popover={<Text> {disability} </Text>}>
      <Icon
        style={grid.containerMini2x}
        name="wheelchair"
        color={colors.disability}
        type="font-awesome"
      />
    </Tooltip>
  );
}

function confirmed() {
  return (
    <Tooltip popover={<Text> Confirmado </Text>}>
      <Icon
        style={grid.containerMini2x}
        name="thumbs-o-up"
        color={colors.ok}
        type="font-awesome"
      />
    </Tooltip>
  );
}

function absenced(absenced_by) {
  return (
    <Tooltip
      popover={<Text> {absenced_by || "Faltou e não justificou"} </Text>}
    >
      <Icon
        style={grid.containerMini2x}
        name="thumbs-o-down"
        color={colors.danger}
        type="font-awesome"
      />
    </Tooltip>
  );
}  

function birthday() {
  return (
    <Tooltip popover={<Text> Aniversariante </Text>}>
      <Icon
        style={grid.containerMini2x}
        name="birthday-cake"
        type="font-awesome"
        color="red"
      />
    </Tooltip>
  );
}

const status = {
  desabilities,
  sex,
  confirmed,
  absenced,
  birthday
};

export default function StatusIcon(type, payload = {}) {
  if (status[type]) return status[type](payload);

  throw new Error("Undefined icon " + type);
}
