import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity , StyleSheet, View, Text } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.welcomeText}>Bienvenido/a</Text>
      
      <View style={styles.summarySection}>
        <Text style={styles.summaryText}>Resumen de Hoy</Text>
        
      </View>
      
      <View style={styles.shortcutsSection}>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Administrar Citas')}>
          <Text style={styles.buttonText}>Reservar Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Historial de Citas')}>
          <Text style={styles.buttonText}>Ver Historial de Citas</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
    alignItems:"center",
    justifyContent:'flex-start',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f5bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width:"75%",
    height: "25%",
    margin:20,
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
