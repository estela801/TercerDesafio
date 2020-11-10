import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBY9aBYdk94Mr3QtRswwL_gBysTC_J4_SU",
  authDomain: "empleados-3b54f.firebaseapp.com",
  databaseURL: "https://empleados-3b54f.firebaseio.com",
  projectId: "empleados-3b54f",
  storageBucket: "empleados-3b54f.appspot.com",
  messagingSenderId: "853156823884",
  appId: "1:853156823884:web:39814f2a731ef4fc0e45e9",
  measurementId: "G-Y6PKC800LH"
};

  
const fb = firebase.initializeApp(firebaseConfig);
export const auth = fb.auth();
export const firestore = fb.firestore();

const provider = new firebase.auth.GoogleAuthProvider();


export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);

  // Para obetner el registro creado
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      // Para crear o reemplazar un solo documento, usa el método set()
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error crear el usuario", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error extraer usuario", error);
    }
  };
  