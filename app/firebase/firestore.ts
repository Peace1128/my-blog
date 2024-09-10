import { app } from "./firebasedb";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);
export default firestore;
