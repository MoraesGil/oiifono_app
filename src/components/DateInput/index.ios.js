import React, { useState, useMemo } from "react";
import { DatePickerIOS } from "react-native";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import {Input, Icon } from "react-native-elements"; 
import { Container, DateButton } from "./styles";
import formStyles from "@/constants/formStyles";

export default function DateInput({ date, onChange, error, label}) {
  const [opened, setOpened] = useState(false);

  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Input
          pointerEvents="none"
          leftIcon={
            <Icon
              name="calendar"
              type="font-awesome"
              color="rgba(0, 0, 0, 0.38)"
              size={25}
              style={{ backgroundColor: "transparent" }}
            />
          }
          editable={false}
          label={label}
          value={dateFormated}
          inputStyle={formStyles.inputWithIcon}
          errorMessage={error}
        />
      </DateButton>
      {opened && (
        <DatePickerIOS
          date={date}
          onDateChange={onChange}
          minimumDate={new Date()}
          minuteInterval={60}
          locale="pt"
          mode="date"
        />
      )}
    </Container>
  );
}
