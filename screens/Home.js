import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase'; 
import { format } from 'date-fns';

export default function Home({ navigation }) {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const unsubscribeDoctors = loadDoctorCount();
    const unsubscribePatients = loadPatientCount();
    const unsubscribeAppointments = loadAppointmentCount();

    return () => {
        // Desuscripción al desmontar el componente
        unsubscribeDoctors();
        unsubscribePatients();
        unsubscribeAppointments();
    };
}, []);

  const loadDoctorCount = () => {
    const unsubscribe = onSnapshot(collection(db, "Doctores"), (querySnapshot) => {
        setDoctorCount(querySnapshot.size);
    }, (error) => {
        console.error("Error al obtener doctores: ", error);
    });

    return unsubscribe;
};

const loadPatientCount = () => {
    const unsubscribe = onSnapshot(collection(db, "Pacientes"), (querySnapshot) => {
        setPatientCount(querySnapshot.size);
    }, (error) => {
        console.error("Error al obtener pacientes: ", error);
    });

    return unsubscribe;
};

  const loadAppointmentCount = () => {
    const todayFormatted = format(new Date(), 'yyyy-MM-dd');

    const q = query(collection(db, "Citas"), where("fecha", ">=", todayFormatted));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setAppointmentCount(querySnapshot.size);
    }, (error) => {
        console.error("Error al obtener citas: ", error);
    });

    return unsubscribe; // Devuelve la función de desuscripción
};

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.homeContainer}>
        <Text style={styles.welcomeText}>Bienvenido/a</Text>

        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>Resumen de Hoy</Text>

          <View>
            <Text style={styles.subTitle}>Pacientes Registrados en la Aplicación</Text>
            <Text style={styles.data}>{patientCount}</Text>
          </View>

          <View>
            <Text style={styles.subTitle}>Doctores Registrados en la Aplicación</Text>
            <Text style={styles.data}>{doctorCount}</Text>
          </View>

          <View>
            <Text style={styles.subTitle}>Citas Médicas Pendientes</Text>
            <Text style={styles.data}>{appointmentCount}</Text>
          </View>

        </View>

        <View style={styles.shortcutsSection}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Administrar Citas')}>
            <Text style={styles.buttonText}>Gestionar Citas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Historial de Citas')}>
            <Text style={styles.buttonText}>Ver Historial de Citas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  data: {
    textAlign: "center",
    fontSize: 45,
    marginBottom: 20,
    fontWeight: "800",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  summarySection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  shortcutsSection: {
    alignItems: "center",
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f5bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: "75%",
    height: 90,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
