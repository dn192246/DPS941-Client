import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddAppointment() {

    const [doctores, setDoctores] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [cita, setCita] = useState({
        doctorNombre: '',
        pacienteNombre: '',
        fecha: '',
        hora: ''
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const cargarDoctores = async () => {
            const querySnapshot = await getDocs(collection(db, "Doctores"));
            const docs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setDoctores(docs);
            if (docs.length > 0) {
                setCita(prevCita => ({ ...prevCita, doctorNombre: docs[0].nombre }));
            }
            //console.log("Doctores cargados:", docs);
        };

        const cargarPacientes = async () => {
            const querySnapshot = await getDocs(collection(db, "Pacientes"));
            const docs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPacientes(docs);
            if (docs.length > 0) {
                setCita(prevCita => ({ ...prevCita, pacienteNombre: docs[0].nombre }));
            }
            //console.log("Pacientes cargados:", docs);
        };

        cargarDoctores();
        cargarPacientes();
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await addDoc(collection(db, "Citas"), {
                doctor: cita.doctorNombre,
                paciente: cita.pacienteNombre,
                fecha: cita.fecha,
                hora: cita.hora
            });
            Alert.alert("Éxito", "Cita agregada con éxito");
            setIsLoading(false);
        } catch (e) {
            Alert.alert("Error", "No se pudo agregar la cita");
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleDoctorChange = (itemValue) => {
        const doctorSeleccionado = doctores.find(doctor => doctor.id === itemValue);
        setCita({
            ...cita,
            doctorNombre: doctorSeleccionado ? doctorSeleccionado.nombre : ''
        });
    };

    const handlePacienteChange = (itemValue) => {
        const pacienteSeleccionado = pacientes.find(paciente => paciente.id === itemValue);
        setCita({
            ...cita,
            pacienteNombre: pacienteSeleccionado ? pacienteSeleccionado.nombre : ''
        });
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (event, date) => {
        hideDatePicker();
        if (date) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Resetear la hora actual para la comparación
            if (date >= currentDate) {
                const formattedDate = date.toLocaleDateString();
                setCita({ ...cita, fecha: formattedDate });
            } else {
                Alert.alert("Error", "No puedes seleccionar una fecha pasada.");
            }
        }
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (event, time) => {
        hideTimePicker();
        if (time) { // Asegúrate de que la hora no sea null
            const formattedTime = time.toLocaleTimeString();
            setCita({ ...cita, hora: formattedTime });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Citas</Text>

            <Text style={styles.subTitle}>Paciente:</Text>
            {pacientes.length > 0 ? (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={cita.pacienteNombre}
                        onValueChange={handlePacienteChange}
                        style={styles.picker}
                        enabled={pacientes.length > 0}
                    >
                        {pacientes.map(paciente => (
                            <Picker.Item key={paciente.id} label={paciente.nombre} value={paciente.id} />
                        ))}
                    </Picker>
                </View>
            ) : (
                <Text>No hay pacientes registrados</Text>
            )}

            <Text style={styles.subTitle}>Doctor:</Text>
            {doctores.length > 0 ? (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={cita.doctorNombre}
                        onValueChange={handleDoctorChange}
                        style={styles.picker}
                        enabled={doctores.length > 0}
                    >
                        {doctores.map(doctor => (
                            <Picker.Item key={doctor.id} label={doctor.nombre} value={doctor.id} />
                        ))}
                    </Picker>
                </View>
            ) : (
                <Text>No hay doctores registrados</Text>
            )}

            <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                <MaterialIcons name="calendar-today" size={20} color="#fff" />
                <Text style={styles.buttonText}>Seleccionar Fecha</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateConfirm}
                />
            )}
            {cita.fecha !== '' && <Text>Fecha seleccionada: {cita.fecha}</Text>}

            <TouchableOpacity style={styles.timeButton} onPress={showTimePicker}>

                <MaterialIcons name="access-time" size={20} color="#fff" />
                <Text style={styles.buttonText}>Seleccionar Hora</Text>
            </TouchableOpacity>
            {isTimePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeConfirm}
                />
            )}
            {cita.hora !== '' && <Text>Hora seleccionada: {cita.hora}</Text>}

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={doctores.length === 0 || pacientes.length === 0}
                >
                    <Text style={styles.buttonText}>Confirmar Cita</Text>
                </TouchableOpacity>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%',
        borderRadius: 15,
    },
    picker: {
        height: 50,
        width: "100%",
        borderColor: "black",
        borderWidth: 10,
    },
    pickerContainer: {
        height: 50,
        width: "75%",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 15,
    },
    subTitle: {
        marginTop: 30,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: "#0084ff",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    imageButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    warningText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        textAlign: "center",
    },
    dateButton: {
        backgroundColor: '#ffae42',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});