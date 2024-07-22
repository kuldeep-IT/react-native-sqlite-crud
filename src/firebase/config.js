import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwbt4OJ6j73EHs6B3fKbZBtyecFfrAGuo",
    authDomain: "jaihoreactnative.firebaseapp.com",
    projectId: "jaihoreactnative",
    storageBucket: "jaihoreactnative.appspot.com",
    messagingSenderId: "839641756424",
    appId: "1:839641756424:web:24ce1b2db816c476ddb2bd",
    measurementId: "G-DE17RH6BPJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { firebase, auth };