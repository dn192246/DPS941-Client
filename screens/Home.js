import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center",
    marginTop: 30,
  },
  contentContainerStyle: {
    padding: 30,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  }
});
