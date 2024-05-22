
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAf1TASpe2OXs0d85VcCxbPhtgUPYeBNXI",
  authDomain: "movie-site-5d7cd.firebaseapp.com",
  projectId: "movie-site-5d7cd",
  storageBucket: "movie-site-5d7cd.appspot.com",
  messagingSenderId: "479429393930",
  appId: "1:479429393930:web:bd416ad5ef583975dba9f3",
  measurementId: "G-P9E0MXER4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider= new GoogleAuthProvider();
export {auth,provider}