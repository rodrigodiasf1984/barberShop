import React, { useLayoutEffect, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import api from '~/services/api';

import { Container, HoursList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const { provider } = route.params;

  function handleSelectTime(time) {
    navigation.navigate('Confirm', { provider, time });
  }

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HoursList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => {
                handleSelectTime(item.value);
              }}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
