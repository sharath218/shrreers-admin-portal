import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
		appID: process.env.NEXT_PUBLIC_APP_ID,
		databaseURL: process.env.NEXT_PUBLIC__FIRESTORE,
		storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_MESSAGESENDER_ID,
	});

	firebase.auth().settings.appVerificationDisabledForTesting = true;
}

export default firebase;
