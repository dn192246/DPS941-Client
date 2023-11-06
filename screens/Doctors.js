import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import AddDoctor from '../components/AddDoctor';
import FloatingButton from '../components/FloatingButton';
import DoctorCard from '../components/DoctorCard';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import SearchBox from '../components/SearchBox';

export default function Doctors() {
  const [addVisible, setAddVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Doctores'),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const { nombre, especialidad, email, telefono, imagen } = doc.data();
          list.push({
            id: doc.id,
            nombre,
            especialidad,
            email,
            telefono,
            imagen
          });
        });

        setDoctors(list);
        if (loading) {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    // Esto se llama cuando el componente se desmonta, para evitar fugas de memoria
    return () => unsubscribe();
  }, [loading]);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredDoctors = searchTerm
    ? doctors.filter((doctor) =>
      doctor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : doctors;
    

  return (
    <View style={styles.container}>

      <SearchBox onChangeText={setSearchTerm} searchTerm={searchTerm} />

      <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.scrollViewContent}>
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
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
            <AddDoctor />
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
    height: "80%",
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