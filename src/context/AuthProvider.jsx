import {createContext, useContext, useState} from "react";
import firebase from 'firebase/compat/app'; // Importar desde 'firebase/compat/app'
import 'firebase/compat/firestore'; // Importar desde 'firebase/compat/firestore'
import 'firebase/compat/analytics'; // Importar desde 'firebase/compat/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyDyCJ_7jSqiKTNHW3ebiUzyXVP2a3_EUq8",
    authDomain: "tdea-92d3f.firebaseapp.com",
    projectId: "tdea-92d3f",
    storageBucket: "tdea-92d3f.appspot.com",
    messagingSenderId: "131078890058",
    appId: "1:131078890058:web:693c8b698f29c006b03cb3",
    measurementId: "G-RBF9CW14X3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [funciones, setFunciones] = useState([]);

    function reloadFns() {
        const collectionRef = db.collection('funciones');
        let fns = [{
            "fn": "Limpiar"
        }]
        collectionRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                fns.push({...doc.data(), key: doc.id})
            });
            setFunciones(fns)
        }).catch((error) => {
            console.error("Error al obtener documentos: ", error);
        });
    }


    return (
        <authContext.Provider value={{db,funciones,reloadFns}}>
            {children}
        </authContext.Provider>
    );
};
