import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrr6Aed-ATmnp1R51y8v87_pPUiCCwZEM",
  authDomain: "happycrafting-11e77.firebaseapp.com",
  projectId: "happycrafting-11e77",
  storageBucket: "happycrafting-11e77.appspot.com",
  messagingSenderId: "926045417949",
  appId: "1:926045417949:web:715b24e9559214c9024634",
  measurementId: "G-FYN3347E57",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// import firebase from "firebase";
// import "firebase/storage"; // <----

// firebase.initializeApp({
//   apiKey: "AIzaSyBrr6Aed-ATmnp1R51y8v87_pPUiCCwZEM",
//   authDomain: "happycrafting-11e77.firebaseapp.com",
//   projectId: "happycrafting-11e77",
//   storageBucket: "happycrafting-11e77.appspot.com",
//   messagingSenderId: "926045417949",
//   appId: "1:926045417949:web:715b24e9559214c9024634",
//   measurementId: "G-FYN3347E57",
// });
// export const storage = firebase.storage().ref();
