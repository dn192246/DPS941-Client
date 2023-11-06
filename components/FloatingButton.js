import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';

const FloatingButton = ({ onPress }) => {//constante del bonton flotante
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.buttonText}>+</Text>    
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: "#ffffff",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#0f5bff",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Puedes ajustar la anchura de la sombra
      height: 10, // y la altura para cambiar cómo se ve la sombra
    },
    shadowOpacity: 0.3, // Opacidad de la sombra; 1 es totalmente opaco
    shadowRadius: 5, // Radio de desenfoque de la sombra

    // Android Shadow
    elevation: 6, // Elevación de la sombra
  }
});

export default FloatingButton;
