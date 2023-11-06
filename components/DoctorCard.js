import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import DoctorDetails from './DoctorDetails';

// Este es un componente funcional llamado DoctorCard que toma un objeto "doctor" como prop.
const DoctorCard = ({ doctor }) => {
// Usamos el hook de estado "useState" para manejar la visibilidad de los detalles del médico.
const [showDetails, setShowDetails] = useState(false);
//Listado de doctores registrados, con su respectivo ID, nombre y Especialidad
  return (
    <View style={{width:"100%", alignItems:"center", justifyContent:"center"}}>

      <TouchableOpacity style={styles.card} onPress={() => { setShowDetails(true) }} activeOpacity={0.8}>
        <Text style={styles.cardId}>ID: {doctor.id}</Text>
        <Text style={styles.cardTitle}>{doctor.nombre}</Text>
        <Text style={styles.cardSpeciality}>{doctor.especialidad}</Text>
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
            <DoctorDetails doctor={doctor} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

    // Estilos de la tarjeta del médico.
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
//Muesta la informacion en pantalla
export default DoctorCard;
