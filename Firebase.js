import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

//iOSClient: 827625944538-i6hd36mgvann91udaqku91jren5bcold.apps.googleusercontent.com
//AndroidClient: 827625944538-sb3ac5rrh8ber0psv2r2votco6a3thc5.apps.googleusercontent.com

const firebaseConfig = {
    apiKey: "AIzaSyCkkFAUciyghWr72bJjMwcRziN2uWiXAzg",
    authDomain: "asilolaesperanza.firebaseapp.com",
    projectId: "asilolaesperanza",
    storageBucket: "asilolaesperanza.appspot.com",
    messagingSenderId: "827625944538",
    appId: "1:827625944538:web:0b0afe33b20f107512bce3"
  };

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
