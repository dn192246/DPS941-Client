import { Text, View, Image, StyleSheet,Alert, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { db } from '../Firebase';
import { AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";

export default function PatientDetails({ patient }) {

    const deletePatient = async () => {
        // Confirmar con el usuario antes de borrar
        Alert.alert(
            "Eliminar Paciente",
            "¿Estás seguro de que quieres eliminar este paciente?",
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
                            await deleteDoc(doc(db, "Pacientes", patient.id));
                            Alert.alert("Eliminado", "El paciente ha sido eliminado correctamente.");

                        } catch (error) {
                            console.error("Error al eliminar el paciente: ", error);
                            Alert.alert("Error", "No se pudo eliminar el paciente.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {patient.imagen != null ?
                    <Image
                        resizeMode='contain'
                        style={styles.picture}
                        source={{
                            uri: patient.imagen,
                        }}
                    />
                    :
                    <Image
                        resizeMode='contain'
                        style={styles.picture}
                        source={require('../assets/noImage.png')}
                    />
                }
                <Text style={styles.name}>{patient.nombre}</Text>
                <Text style={{ fontSize: 14, marginBottom: 10 }}>Paciente</Text>
                <Text style={styles.info}>Email: {patient.email}</Text>
                <Text style={styles.info}>Teléfono: {patient.telefono}</Text>
                <Text style={styles.info}>Fecha de Nacimiento: {patient.fechaNacimiento}</Text>
                <View style={styles.line}><Text></Text></View>
                <View style={styles.actions}>
                    <AntDesign style={{ marginRight: 5 }} name="infocirlce" size={24} color="brown" />
                    <Text style={styles.actionsText}>Acciones</Text>
                </View>
                {/*Botón para eliminar*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#b8021d" }]} onPress={deletePatient}>
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
        padding: 30,
        height: "90%",
        backgroundColor:"white"
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