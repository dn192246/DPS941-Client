import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import AddAppointment from '../components/AddAppointment';
import FloatingButton from '../components/FloatingButton';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import SearchBox from '../components/SearchBox';
import AppointmentCard from '../components/AppointmentCard';

export default function Appointments() {
  const [addVisible, setAddVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const esFechaFutura = (fechaCita) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const partesFecha = fechaCita.split("/");
    const fechaFormatoCorrecto = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    const fecha = new Date(fechaFormatoCorrecto);
    return fecha >= hoy;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Citas'),
      (querySnapshot) => {
        const list = querySnapshot.docs.map((doc) => {
          const { doctor, paciente, fecha, hora } = doc.data();
          return {
            id: doc.id,
            doctor,
            paciente,
            fecha,
            hora
          };
        });

        const citasFiltradas = list.filter(cita => esFechaFutura(cita.fecha));
        setAppointments(citasFiltradas);

        if (loading) {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, [loading]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'Citas', appointmentId));
      Alert.alert('Cita eliminada', 'La cita ha sido eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      Alert.alert('Error', 'No se pudo eliminar la cita');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filterAppointments = searchTerm
    ? appointments.filter((appointment) =>
      appointment.paciente.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : appointments;


  return (
    <View style={styles.container}>

      <SearchBox onChangeText={setSearchTerm} searchTerm={searchTerm} />

      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scrollViewContent}>
        {filterAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onDelete={() => handleDeleteAppointment(appointment.id)}
          />
        ))}
      </ScrollView>
      <FloatingButton onPress={() => setAddVisible(true)} />

      <Modal
        transparent={true}
        visible={addVisible}
        onRequestClose={() => setAddVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setAddVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeTag}>X</Text>
            </TouchableOpacity>
            <AddAppointment />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 30,
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
  closeButtonContainer: {
    alignItems: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollViewContent: {
    // Esto centra los elementos hijos (tarjetas) dentro del ScrollView
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: "75%",
    width: "85%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 28,
    color: "#ffffff",
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 999,
    backgroundColor: "#0f5bff",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0, //anchura de la sombra
      height: 10, //altura de la sombra
    },
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Radio de desenfoque de la sombra

    // Android Shadow
    elevation: 6, // Elevación de la sombra
  },
});