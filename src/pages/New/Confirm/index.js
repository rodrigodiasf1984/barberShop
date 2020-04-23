import React, { useLayoutEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { StackActions } from '@react-navigation/native';
import Background from '~/components/Background';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '~/services/api';

export default function Confirm({ navigation, route }) {
  const { provider, time } = route.params;
  // console.tron.log(time);
  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );
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
  }, [navigation]);

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });
    navigation.dispatch(StackActions.replace('SelectProvider'));
    navigation.navigate('Agendamentos');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton
          onPress={() => {
            handleAddAppointment();
          }}
        >
          Confirmar
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};
