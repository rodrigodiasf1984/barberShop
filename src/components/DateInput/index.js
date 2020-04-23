import React, { useState, useMemo } from 'react';
import { DatePickerIOS, DatePickerAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleOpenPickerAndroid() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });
    if (action === DatePickerAndroid.dateSetAction) {
      const selectDate = new Date(year, month, day);
      onChange(selectDate);
    }
  }
  return (
    <Container>
      {Platform.OS === 'ios' ? (
        <DateButton onPress={() => setOpened(!opened)}>
          <Icon name="event" color="#fff" size={20} />
          <DateText>{dateFormatted}</DateText>
        </DateButton>
      ) : (
        <DateButton onPress={handleOpenPickerAndroid}>
          <Icon name="event" color="#fff" size={20} />
          <DateText>{dateFormatted}</DateText>
        </DateButton>
      )}
      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
};
