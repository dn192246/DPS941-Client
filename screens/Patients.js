import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native';
import AddPatient from '../components/AddPatient';
import FloatingButton from '../components/FloatingButton';
import PatientCard from '../components/PatientCard';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import SearchBox from '../components/SearchBox';

export default function Patients() {
  const [addVisible, setAddVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Pacientes'),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const { nombre, email, telefono, imagen, fechaNacimiento } = doc.data();
          list.push({
            id: doc.id,
            nombre,
            email,
            telefono,
            imagen,
            fechaNacimiento
          });
        });

        setPatients(list);
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredPatients = searchTerm 
  ? patients.filter((patient)=>
  patient.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )
  :patients;

  return (
    <View style={styles.container}>

      <SearchBox onChangeText={setSearchTerm} searchTerm={searchTerm} />

      <ScrollView style={{width:"100%"}} contentContainerStyle={styles.scrollViewContent}>
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
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
            <AddPatient />
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
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'flex-start', 
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
      width: 0, 
      height: 10, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 5,

    // Android Shadow
    elevation: 6,
  }
});