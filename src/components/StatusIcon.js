import React from "react";
import { Text } from "react-native";
import { Icon, Tooltip } from "react-native-elements";
import colors from "@/constants/Colors";
import grid from "@/constants/grid";

function gender(gender) {
  return (
    <Tooltip
      popover={<Text> {gender == "m" ? "Masculino" : "Feminino"} </Text>}
    >
      <Icon
        style={{ marginRight: 20, marginLeft: 26 }}
        name={gender == "m" ? "male" : "female"}
        type="font-awesome"
        color={gender == "m" ? colors.male : colors.female}
      />
    </Tooltip>
  );
} 

function desability(disability) {
  return (
    <Tooltip popover={<Text> {disability} </Text>}>
      <Icon 
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
        name="birthday-cake"
        type="font-awesome"
        color="red"
      />
    </Tooltip>
  );
}

const status = {
  desability,
  gender,
  confirmed,
  absenced,
  birthday
};

export default function StatusIcon(type, payload = {}) {
  if (status[type]) return status[type](payload);

  throw new Error("Undefined icon " + type);
}
