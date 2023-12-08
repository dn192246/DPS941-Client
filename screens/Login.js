import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de inicio de sesión
    };

    const handleRegister = () => {
        // Lógica de registro
    };

    const handleGoogleLogin = () => {
        // Lógica de inicio de sesión con Google
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

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <MaterialIcons name="login" size={20} color="white" />
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <AntDesign name="adduser" size={20} color="white" />
                <Text style={styles.buttonText}>Registrarse con Correo Electrónico</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
                <FontAwesome name="google" size={20} color="white" />
                <Text style={styles.buttonText}>Iniciar con Google</Text>
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

export default Login;