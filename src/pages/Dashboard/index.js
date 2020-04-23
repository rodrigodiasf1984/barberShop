import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import Background from '~/components/Background';
import Appointement from '~/components/Appointement';
import { Container, Title, List } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const [appointments, setAppointments] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');
      setAppointments(response.data);
    }
    loadAppointments();
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointement onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarIcon: ({ color }) => <Icon name="event" size={25} color={color} />,
};
