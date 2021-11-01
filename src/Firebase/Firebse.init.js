import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initializeAuthenticaion = () => {
     initializeApp(firebaseConfig);
}

export default initializeAuthenticaion;
