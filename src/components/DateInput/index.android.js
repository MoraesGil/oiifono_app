import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Input, Icon } from "react-native-elements";
import { Container, DateButton } from "./styles";
import formStyles from "@/constants/formStyles";

export default function DateInput({ date, onChange, error, label }) {
  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );
  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: "spinner",
      date
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);
      onChange(selectedDate);
    }
  }
  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
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
    </Container>
  );
}
