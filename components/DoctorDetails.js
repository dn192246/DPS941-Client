import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { app, auth, db } from '../Firebase';
import { AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Este es un componente llamado DoctorDetails que muestra los detalles de un médico y proporciona la opción de eliminarlo.
export default function DoctorDetails({ doctor }) {
    // Función asincrónica para eliminar un médico después de que el usuario confirme.
    const deleteDoctor = async () => {
        // Confirmar con el usuario antes de borrar
        Alert.alert(
            "Eliminar Doctor",
            "¿Estás seguro de que quieres eliminar este doctor?",
            [
                // Botón Cancelar
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                // Botón Confirmar
                {
                    text: "Sí, eliminar",
                    onPress: async () => {
                        try {
                            //Borrar al doctor
                            await deleteDoc(doc(db, "Doctores", doctor.id));
                            Alert.alert("Eliminado", "El doctor ha sido eliminado correctamente.");
                            
                            //Borrar la imagen del doctor
                            if (doctor.imagen) {
                                const storage = getStorage(app);

                                const imageRef = ref(storage, doctor.imagen);
                                await deleteObject(imageRef);
                            }
                        } catch (error) {
                            console.error("Error al eliminar el doctor: ", error);
                            Alert.alert("Error", "No se pudo eliminar el doctor.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {doctor.imagen != null ?
                    <Image
                        resizeMode='contain'
                        style={styles.picture}
                        source={{
                            uri: doctor.imagen,
                        }}
                    />
                    :
                    <Image
                        resizeMode='contain'
                        style={styles.picture}
                        source={require('../assets/noImage.png')}
                    />
                }

                <Text style={styles.name}>{doctor.nombre}</Text>
                <Text style={{ fontSize: 14, marginBottom: 10 }}>Médico</Text>
                <Text style={styles.info}>{doctor.especialidad}</Text>
                <Text style={styles.info}>{doctor.email}</Text>
                <Text style={styles.info}>{doctor.telefono}</Text>
                <View style={styles.line}><Text></Text></View>
                <View style={styles.actions}>
                    <AntDesign style={{ marginRight: 5 }} name="infocirlce" size={24} color="brown" />
                    <Text style={styles.actionsText}>Acciones</Text>
                </View>
                {/*Botón para eliminar*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#b8021d" }]} onPress={deleteDoctor}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>

                {/*Botón para modificar*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#d48002", marginBottom:60 }]}>
                    <Text style={styles.buttonText}>Modificar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        height: "90%",
    },
    line: {
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 2,
        width: "100%",
    },
    scrollContent: {
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: "500",
    },
    info: {
        fontSize: 18,
        fontWeight: "400",
        marginVertical: 10
    },
    picture: {
        width: 200,
        height: 200,
        margin: 20,
    },
    actionsText: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 5
    },
    actions: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    button: {
        justifyContent: "center",
        alignContent: 'center',
        textAlign: 'center',
        width: 120,
        height: 40,
        marginVertical: 20
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    }
});