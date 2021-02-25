import firebaseAdmin from "firebase-admin";

// for deploying you need to delete it
import serviceAccount from "./secret.json";
// admin credential for localhost or emulator

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export default firebaseAdmin;
