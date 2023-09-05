// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-JXT_2-PWxu9EARjaSV0LqdWyTIOh_oM",
  authDomain: "hw-mobilesv.firebaseapp.com",
  databaseURL:
    "https://hw-mobilesv-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hw-mobilesv",
  storageBucket: "hw-mobilesv.appspot.com",
  messagingSenderId: "966579773075",
  appId: "1:966579773075:web:5c35deb4a7489d9f8cb766",
  measurementId: "G-W41HKFS9NG",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
