import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// Initialize Firebase
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

export { app, auth, db, storage };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
