import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function StatusIcon() {   
    return (
    <Tooltip
      popover={<Text> {person.sex == "m" ? "Masculino" : "Feminino"} </Text>}
    >
      <Ionicons
        style={grid.containerMini2x}
        name={person.sex == "m" ? "md-man" : "md-woman"}
        size={26}
        color={person.sex == "m" ? colors.male : colors.female}
      />
    </Tooltip>
  );
}
