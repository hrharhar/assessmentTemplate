import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0kqGydcFrJbTgy_600m5woRRzNGV18dU",
  authDomain: "aptitudetest-5228c.firebaseapp.com",
  projectId: "aptitudetest-5228c",
  storageBucket: "aptitudetest-5228c.firebasestorage.app",
  messagingSenderId: "991815872449",
  appId: "1:991815872449:web:ca2c74803e1ed85f224940"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);