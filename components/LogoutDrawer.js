import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LogoutDrawer(props) {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate('Login');
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar Sesión"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" size={size} color={color} />
        )}
        onPress={handleSignOut}
      />
    </DrawerContentScrollView>
  );
}

export default LogoutDrawer;