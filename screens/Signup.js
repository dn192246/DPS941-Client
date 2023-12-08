import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Lógica de registro
    };

    return (
        <View style={styles.container}>
            <Image 
            source={require('../assets/DPS-Splash.png')}
            style={{ width: 220, height: 220 }}
            />
            <Text style={styles.welcomeText}>Inicio de Sesión</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Correo electrónico" 
                onChangeText={setEmail} 
                value={email}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Contraseña" 
                onChangeText={setPassword} 
                value={password}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <AntDesign name="adduser" size={20} color="white" />
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {backgroundColor:"darkred", height:65}]} onPress={handleRegister}>
                <AntDesign name="adduser" size={20} color="white" />
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor:"#ffde59",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 80,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor:"white",
        fontSize:15
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#0f5bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        height:70,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 15,
    }
});

export default Signup;