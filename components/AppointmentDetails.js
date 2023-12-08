import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { app, auth, db } from '../Firebase';
import { AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Este es un componente llamado DoctorDetails que muestra los detalles de un médico y proporciona la opción de eliminarlo.
export default function AppointmentDetails({ appointment }) {
    // Función asincrónica para eliminar un médico después de que el usuario confirme.
    const deleteAppointment = async () => {
        // Confirmar con el usuario antes de borrar
        Alert.alert(
            "Eliminar Cita",
            "¿Estás seguro de que quieres eliminar esta cita?",
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
                            await deleteDoc(doc(db, "Citas", appointment.id));
                            Alert.alert("Eliminado", "La cita ha sido eliminado correctamente.");
                            
                            //Borrar la imagen del doctor
                            if (appointment.imagen) {
                                const storage = getStorage(app);

                                const imageRef = ref(storage, appointment.imagen);
                                await deleteObject(imageRef);
                            }
                        } catch (error) {
                            console.error("Error al eliminar la cita: ", error);
                            Alert.alert("Error", "No se pudo eliminar la cita.");
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

                <Text style={styles.name}>{appointment.nombre}</Text>
                <Text style={{ fontSize: 14, marginBottom: 10 }}>Cita</Text>
                <Text style={styles.info}>{appointment.especialidad}</Text>
                <Text style={styles.info}>{appointment.email}</Text>
                <Text style={styles.info}>{appointment.telefono}</Text>
                <View style={styles.line}><Text></Text></View>
                <View style={styles.actions}>
                    <AntDesign style={{ marginRight: 5 }} name="infocirlce" size={24} color="brown" />
                    <Text style={styles.actionsText}>Acciones</Text>
                </View>
                {/*Botón para eliminar*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#b8021d" }]} onPress={deleteAppointment}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>

                {/*Botón para modificar*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#d48002" }]}>
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