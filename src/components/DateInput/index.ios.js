import React, { useState, useMemo } from "react";
import { DatePickerIOS } from "react-native";
import { format  as formater} from "date-fns";
import pt from "date-fns/locale/pt";

import { Input, Icon } from "react-native-elements";
import { Container, DateButton } from "./styles";
import formStyles from "@/constants/formStyles";

export default function DateInput({
  date,
  onChange,
  error,
  label,
  placeholder,
  minuteInterval,
  mode,
  minDate,
  maxDate,
  format,
}) {
  const [opened, setOpened] = useState(false);

  const defaultFormats = {
    "date":"dd 'de' MMMM 'de' yyyy",
    "time":''
  }

  const dateFormated = useMemo(
    () =>
      formater(date, format || defaultFormats[mode || "date"], {
        locale: pt
      }),
    [date]
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Input
          placeholder={placeholder}
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
          minimumDate={minDate}
          maximumDate={maxDate}
          minuteInterval={minuteInterval}
          locale="pt"
          mode={mode || "date"}
        />
      )}
    </Container>
  );
}
