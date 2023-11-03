import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PatientCard = ({ patient, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.cardId}>ID: {patient.id}</Text>
      <Text style={styles.cardTitle}>{patient.nombre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width:"80%",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardId: {
    fontSize: 10,
    color: '#A9A9A9',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
  },
});

export default PatientCard;