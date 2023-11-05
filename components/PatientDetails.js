import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { app, auth, db } from '../Firebase';
import { AntDesign } from '@expo/vector-icons';

export default function PatientDetails({Id}) {
    return (
        <View>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/*}
                <Image
                    resizeMode='contain'
                    style={styles.picture}
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/asilolaesperanza.appspot.com/o/images%2F1698976966206-Rick?alt=media&token=191891dd-4b8f-4050-8b8a-11631c6b9a78&_gl=1*rsm9lt*_ga*MTI3Nzc5NTI3MC4xNjk4OTAyMjQw*_ga_CW55HF8NVT*MTY5OTE1NzE0My4xMC4xLjE2OTkxNTcxNTQuNDkuMC4w'
                    }}
                />
                {*/}
                <Image
                    resizeMode='contain'
                    style={styles.picture}
                    source={require('../assets/noImage.png')}
                />
                <Text style={styles.name}>Nombre Completo</Text>
                <Text style={{fontSize:14, marginBottom:10}}>Paciente</Text>
                <Text style={styles.info}>mail@mail.com</Text>
                <Text style={styles.info}>2200-9928</Text>
                <View style={styles.line}><Text></Text></View>
                <View style={styles.actions}>
                    <AntDesign style={{ marginRight: 5 }} name="infocirlce" size={24} color="brown" />
                    <Text style={styles.actionsText}>Acciones</Text>
                </View>
                {/*Botón para eliminar*/}
                <TouchableOpacity style={[styles.button,{backgroundColor:"#b8021d"}]}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>

                 {/*Botón para modificar*/}
                <TouchableOpacity style={[styles.button,{backgroundColor:"#d48002"}]}>
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
    button:{
        justifyContent:"center",
        alignContent:'center',
        textAlign:'center',
        width:120,
        height:40,
        marginVertical: 20
    },
    buttonText:{
        color:"white",
        fontSize:16,
        textAlign:"center",
    }
});