import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import PatientDetails from './PatientDetails';

const PatientCard = ({ patient }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={{width:"100%", alignItems:"center", justifyContent:"center"}}>

    <TouchableOpacity style={styles.card} onPress={() => { setShowDetails(true) }} activeOpacity={0.8}>
      <Text style={styles.cardId}>ID: {patient.id}</Text>
      <Text style={styles.cardTitle}>{patient.nombre}</Text>
    </TouchableOpacity>

    <Modal
        transparent={false}
        visible={showDetails}
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowDetails(false)}
              style={styles.closeButton}>
              <Text style={styles.closeTag}>X</Text>
            </TouchableOpacity>
            <PatientDetails patient={patient} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%', // Ancho relativo al contenedor
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: '10%', // Margen horizontal relativo al contenedor
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
    fontSize: 12, // Tamaño de fuente ligeramente mayor
    color: '#A9A9A9',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20, // Tamaño de fuente ligeramente mayor
    marginTop: 8, // Espaciado superior mayor
  },
  closeButton: {
    backgroundColor: "#b30000",
    borderRadius: 15, // Mayor tamaño de borde
    width: 40, // Mayor tamaño del botón
    height: 40, // Mayor tamaño del botón
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurecerá el fondo
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    height: '90%', // Altura relativa al contenedor
    width: '90%', // Ancho relativo al contenedor
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
  }
});

export default PatientCard;
