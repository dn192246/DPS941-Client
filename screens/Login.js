import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Cuenta Creada")
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message)
            })
    };

    const handleSignIn= ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Sesión Iniciada")
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message)
            })
    };

    const handleGoogleLogin = () =>{

    }

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

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <MaterialIcons name="login" size={20} color="white" />
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                <AntDesign name="adduser" size={20} color="white" />
                <Text style={styles.buttonText}>Registrarse</Text>
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
        backgroundColor: "#ffde59",
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
        backgroundColor: "white",
        fontSize: 15
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
        height: 70,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 15,
    }
});

export default Login;