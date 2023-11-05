import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function AddPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState(null);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{4}-\d{4}$/; // Matches a pattern like "1234-5678"
    return regex.test(phoneNumber);
  };

  const handleSubmit = async () => {
    // Verificar que hay datos en los campos para evitar enviar datos vacíos
    if (nombre && telefono && email && fecha) {

      if (!validateEmail(email)) {
        Alert.alert("Advertencia", "Ingresa un correo electrónico válido.");
        return; // Salir de la función si el email no es válido
      }

      if (!validatePhoneNumber(telefono)) {
        Alert.alert("Advertencia", "El número de teléfono debe tener el formato ####-####.");
        return; // Salir de la función si el teléfono no es válido
      }

      setIsLoading(true);
      try {
        let imageUrl = null;
        if (imagen) {
          // Crear una referencia a Storage con un nombre único para la imagen
          const imageRef = ref(storage, `images/${Date.now()}-${nombre}`);
          const response = await fetch(imagen);
          const blob = await response.blob();

          // Subir la imagen a Firebase Storage
          const snapshot = await uploadBytes(imageRef, blob);
          // Obtener la URL de descarga de la imagen cargada
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        // Añadir un nuevo documento con los datos del paciente en Firestore
        const docRef = await addDoc(collection(db, "Pacientes"), {
          nombre: nombre,
          telefono: telefono,
          email: email,
          fechaNacimiento: fecha,
          imagen: imageUrl
        });
        setIsLoading(false);
        Alert.alert("Éxito", "Se ha almacenado correctamente el paciente");
        console.log("Documento escrito con ID: ", docRef.id);

        //Limpieza de los estados después de la operación
        setNombre('');
        setTelefono('');
        setEmail('');
        setFecha('');
        setImagen(null);

      } catch (e) {
        console.error("Error al añadir el documento: ", e);
      }
    } else {
      // Manejo de error si alguno de los campos está vacío
      Alert.alert("Advertencia", "Llena correctamente todos los campos para continuar");
      console.log("Todos los campos deben estar llenos.");
    }
    setIsLoading(false);
  };

  const openGalery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agrega un nuevo Paciente</Text>
      <ScrollView style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento"
          value={fecha}
          onChangeText={setFecha}
        />
        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.loadImageButton} title="Toma una foto con tu cámara" onPress={openCamera}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loadImageButton} title="Escoge una foto de tu librería" onPress={openGalery}>
            <Text style={styles.buttonText}>Cargar Imagen</Text>
          </TouchableOpacity>
        </View>


        <View style={{ alignItems: "center" }}>
          {imagen && <View>
            <Image source={{ uri: imagen }} style={{ width: 200, height: 200, marginVertical: 20 }} />
            <TouchableOpacity style={styles.removeImageButton} onPress={() => setImagen(null)}>
              <Text style={styles.buttonText}>Quitar Imagen</Text>
            </TouchableOpacity>
          </View>
          }
        </View>

      </ScrollView>
      <Text>{"\n"}</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.75} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Agregar Doctor</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 30,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderRadius: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#0084ff",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loadImageButton: {
    backgroundColor: "#b3b2b1",
    padding: 8,
    borderRadius: 10,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageButton: {
    backgroundColor: "#b80208",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  }
});