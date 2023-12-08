import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AppointmentCard = ({ appointment, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => onDelete(appointment.id) }
      ]
    );
  };

  return (
    <View style={[styles.card,{ width: "85%", alignItems: "center", justifyContent: "center", }]}>

      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.cardInfo}>Paciente: {appointment.paciente}</Text>
        <Text style={styles.cardInfo}>Doctor: {appointment.doctor}</Text>
        <Text style={styles.cardInfo}>Fecha: {appointment.fecha} - {appointment.hora}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>

    </View>
  );
};

// Estilos de la tarjeta de la cita.
const styles = StyleSheet.create({
  card: {
    width: "80%",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardId: {
    fontSize: 10,
    color: '#A9A9A9',
  },
  cardSpeciality: {
    fontSize: 10,
    color: '#A9A9A9',
  },
  cardInfo:{
    fontSize:15,
    margin:5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: "#b30000",
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  closeTag: {
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Esto oscurecerá el fondo
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    height: "90%",
    width: "90%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
  }
});

export default AppointmentCard;