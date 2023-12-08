import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase, { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [userInfo, setUserInfo] = React.useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "827625944538-i6hd36mgvann91udaqku91jren5bcold.apps.googleusercontent.com",
        androidClientId: "827625944538-sb3ac5rrh8ber0psv2r2votco6a3thc5.apps.googleusercontent.com",
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    WebBrowser.maybeCompleteAuthSession()

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión con Google: ", error);
                });
        }
    }, [response]);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Cuenta Creada")
                Alert.alert("Ha creado su cuenta exitosamente. Inicie sesión para continuar.", "Puede presionar el botón de Inicio de Sesión para acceder")
                //const user = userCredential.user;
                //console.log(user);
            })
            .catch(error => {
                //console.log(error);
                Alert.alert(error.message)
            })
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Sesión Iniciada")
                const user = userCredential.user;
                //console.log(user);
                setEmail('');
                setPassword('');
                navigation.navigate('Home');
            })
            .catch(error => {
                //console.log(error);
                Alert.alert(error.message)
                setPassword('');
            })
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

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <MaterialIcons name="login" size={20} color="white" />
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                <AntDesign name="adduser" size={20} color="white" />
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
                <FontAwesome name="google" size={20} color="white" />
                <Text style={styles.buttonText}>Continuar con Google</Text>
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