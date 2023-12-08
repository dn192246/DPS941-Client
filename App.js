import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Appointments from './screens/Appointments';
import Doctors from './screens/Doctors';
import History from './screens/History';
import Home from './screens/Home';
import Patients from './screens/Patients';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, Ionicons, Fontisto, AntDesign } from '@expo/vector-icons';
import MenuItems from './constants/MenuItems';
import Login from './screens/Login';
import { useNavigation } from '@react-navigation/native';
import LogoutDrawer from './components/LogoutDrawer';

const Drawer = createDrawerNavigator();

function Application() {

  return (
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Inicio"
        screenOptions={{ activeTintColor: '#e91e63', itemStyle: { marginVertical: 10 } }}
        drawerContent={(props) => <LogoutDrawer {...props} />}
      >

        {
          MenuItems.map(elemento => <Drawer.Screen
            key={elemento.name}
            name={elemento.name}
            options={{
              drawerIcon: ({ focused }) =>
                elemento.iconType === 'MaterialCommunityIcons' ?
                  <MaterialCommunityIcons
                    name={elemento.iconName}
                    size={24}
                    color={focused ? "#d98b04" : "black"}
                  />
                  :
                  elemento.iconType === 'FontAwesome' ?
                    <FontAwesome
                      name={elemento.iconName}
                      size={24}
                      color={focused ? "#d98b04" : "black"}
                    />
                    :
                    elemento.iconType === 'Ionicons' ?
                      <Ionicons
                        name={elemento.iconName}
                        size={24}
                        color={focused ? "#d98b04" : "black"}
                      />
                      :
                      elemento.iconType === 'Fontisto' ?
                        <Fontisto
                          name={elemento.iconName}
                          size={24}
                          color={focused ? "#d98b04" : "black"}
                        />
                        :
                        elemento.iconType === 'FontAwesome5' ?
                          <FontAwesome5
                            name={elemento.iconName}
                            size={24}
                            color={focused ? "#d98b04" : "black"}
                          />
                          :
                          <AntDesign
                            name={elemento.iconName}
                            size={24}
                            color={focused ? "#d98b04" : "black"}
                          />
            }}
            component={
              elemento.name === 'Inicio' ? Home
                : elemento.name === 'Doctores' ? Doctors
                  : elemento.name === 'Pacientes' ? Patients
                    : elemento.name === 'Administrar Citas' ? Appointments
                      : elemento.name === 'Historial de Citas' ? History
                        : Home
            }
          />)
        }
      </Drawer.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Application} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}