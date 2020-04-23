import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';
import Dashboard from '~/pages/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const NewStack = createStackNavigator();

function Login() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function newStackScreens() {
  return (
    <NewStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
      }}
    >
      <NewStack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{ title: 'Selecione o prestador' }}
      />
      <NewStack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{ title: 'Selecione o horário' }}
      />
      <NewStack.Screen
        name="Confirm"
        component={Confirm}
        options={{ title: 'Confirmar o agendamento' }}
      />
    </NewStack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarVisible: route.name !== 'Agendar',
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case 'Agendar': {
              iconName = 'add-circle-outline';
              break;
            }
            case 'Meu Perfil': {
              iconName = 'person';
              break;
            }
            case 'Agendamentos': {
              iconName = 'event';
              break;
            }
            default:
          }
          return (
            <Icon
              name={iconName}
              size={20}
              color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
            />
          );
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        labelStyle: {
          fontSize: 14,
        },
        tabStyle: {
          height: 50,
        },
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <Tab.Screen name="Agendamentos" component={Dashboard} />
      <Tab.Screen name="Agendar" component={newStackScreens} />
      <Tab.Screen name="Meu Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {signed ? (
          <RootStack.Screen name="Home" component={BottomTabs} />
        ) : (
          <RootStack.Screen name="Login" component={Login} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
