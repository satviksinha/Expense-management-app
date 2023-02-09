import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth"

  const firebaseConfig = {
        apiKey: "AIzaSyDl5K6X7Q6gAYv2RChz70-1pxh_u0pbHAM",
        authDomain: "expense-management-app-2857a.firebaseapp.com",
        projectId: "expense-management-app-2857a",
        storageBucket: "expense-management-app-2857a.appspot.com",
        messagingSenderId: "322874805441",
        appId: "1:322874805441:web:6cd3e3586eccb435f21840",
        measurementId: "G-KBSG55LNLH"
  }

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app);

  const provider = new GoogleAuthProvider()

  export const signInWithGoogle = () => {
      signInWithPopup(auth,provider)
      .then((result) => {
            console.log(result)
            const emailVerified = result.user.emailVerified;
            const name = result.user.displayName;
            localStorage.setItem("emailVerified",emailVerified);
             localStorage.setItem("name",name);
      })
  }
