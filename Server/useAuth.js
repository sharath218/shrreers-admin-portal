import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useMemo,
} from "react";

import firebase from "./firebase/firebase";
import useUserDetails from "../Hooks/useUserDetails";
import { useQuery, QueryCache, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

// const notify = (value) =>
// 	toast.error(value, {
// 		position: "bottom-center",
// 		autoClose: 5000,
// 		hideProgressBar: false,
// 		closeOnClick: true,
// 		pauseOnHover: true,
// 		draggable: true,
// 		progress: undefined,
// 	});

// Add your Firebase credentials

export const auth = firebase.auth;
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [pending, setPending] = useState(true);
	const [userid, setUserid] = useState(null);
	const [role, setrole] = useState(null);
	const [currentstudentId, setcurrentstudentId] = useState(null);
	const [currentstudenName, setcurrentstudentName] = useState("");
	const [currentstudentgrade, setcurrentstudentgrade] = useState(null);
	const [sessionStatred, setSessionStatred] = useState(false);
	const [curSessionIndex, setcurSessionIndex] = useState(null);
	const [progress, setProgress] = useState(null);
	const queryClient = useQueryClient();
	const queryCache = new QueryCache({});
	const router = useRouter();
	// Wrap any Firebase methods we want to use making sure ...
	// ... to save the user to state.

	const signin = (email, password) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (response) => {
				console.log("user", await response);
				setUser(response.user);

				axios
					.get(`mutual/getUserDetails`, {
						params: {
							id: email,
						},
					})
					.then((res) => {
						console.log("res", res.data[0][0]);
						const user_id_data = res.data[0][0];
						console.log(user_id_data);
						setUserid(user_id_data.user_id);
						setrole(user_id_data.user_role);
						localStorage.setItem("userid", user_id_data.user_id);
						localStorage.setItem("role", user_id_data.user_role);
					});
				return response.user;
			})
			.catch((error) => {
				console.log("error.code", error);

				//notify(error.message);
			});
	};

	const signup = async (email, password) => {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (response) => {
				setUser(response.user);
				console.log("sign user", user);

				return response.user;
			})
			.catch((error) => {
				console.log("error.code", error);

				//notify(error.message);
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUserid(null);
				setrole(null);
				setUser(null);
				queryClient.invalidateQueries();
				queryClient.clear();
				queryCache.queries.length = 0;
				queryCache.clear();
				router.push("/login");
			});
	};

	const sendPasswordResetEmail = (email) => {
		return firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				return true;
			});
	};

	const confirmPasswordReset = (code, password) => {
		return firebase
			.auth()
			.confirmPasswordReset(code, password)
			.then(() => {
				return true;
			});
	};

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.

	const setUpRecaptcha = (value) => {
		return new firebase.auth.RecaptchaVerifier(value);
	};

	const signwithmobile = (number, recaptcha) => {
		return firebase
			.auth()
			.signInWithPhoneNumber(number, recaptcha)
			.then((response) => {
				console.log(response);
				return response;
			});
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setPending(false);
				localStorage.setItem("user", JSON.stringify(user));

				axios
					.get(`mutual/getUserDetails`, {
						params: {
							id: user.email,
						},
					})
					.then((res) => {
						//console.log("res", res.data[0][0]);
						const user_id_data = res.data[0][0];
						console.log(user_id_data);
						setUserid(user_id_data.user_id);
						setrole(user_id_data.user_role);
						localStorage.setItem("userid", user_id_data.user_id);
						localStorage.setItem("role", user_id_data.user_role);
					});
				//console.log("user_id_res----", await user_id_res);

				// if (user_id_res) {
				// 	const user_id_data = await user_id_res[0][0];
				// 	console.log(user_id_data);
				// 	setUserid(user_id_data.user_id);
				// 	setrole(user_id_data.user_role);
				// 	localStorage.setItem("userid", user_id_data.user_id);
				// 	localStorage.setItem("role", user_id_data.user_role);
				// }
			} else {
				setUser(null);
				setrole(null);
				localStorage.clear();
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);
	let user_id_data;
	// useEffect(() => {
	// 	if (typeof window !== undefined) {
	// 		window.nookies = nookies;
	// 	}
	// 	return firebase.auth().onIdTokenChanged(async (user) => {
	// 		console.log(`token changed!`);
	// 		if (!user) {
	// 			console.log(`no token found...`);
	// 			setUser(null);
	// 			nookies.destroy(null, "token");
	// 			nookies.set(null, "token", "", {});
	// 			return;
	// 		}

	// 		console.log(`updating token...`);
	// 		const token = await user.getIdToken();

	// 		nookies.destroy(null, "token");
	// 		nookies.set(null, "token", token, {});

	// 		const user_id_res = await fetch(
	// 			`https://www.shreersctutors.com/api/student/${user.email}/getUserId`
	// 		);
	// 		//const user_id_res = useUserDetails(user.email);

	// 		const user_id_data = await user_id_res.json();
	// 		console.log(await user_id_data);
	// 		if ((await user_id_data.length) > 0) {
	// 			// console.log(user_id_data[0])
	// 			// console.log(JSON.stringify(user_id_data[0].user_id));
	// 			// console.log(JSON.stringify(user_id_data[0].role));
	// 			console.log(await user_id_data);
	// 			setUserid(user_id_data[0].user_id);
	// 			setrole(user_id_data[0].user_role);
	// 		}

	// 		console.log("useeffect completed");
	// 	});
	// }, []);

	// // force refresh the token every 10 minutes
	// useEffect(() => {
	// 	const handle = setInterval(async () => {
	// 		console.log(`refreshing token...`);
	// 		const user = firebase.auth().currentUser;
	// 		if (user) await user.getIdToken(true);
	// 	}, 50 * 60 * 1000);

	// 	return () => clearInterval(handle);
	// }, []);

	// Return the user object and auth methods
	return {
		user,
		signin,
		signup,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
		setUpRecaptcha,
		signwithmobile,
		userid,
		role,
		setUserid,
		setrole,
		setcurrentstudentId,
		currentstudentId,
		pending,
		setcurrentstudentName,
		currentstudenName,
		currentstudentgrade,
		setcurrentstudentgrade,
		sessionStatred,
		setSessionStatred,
		curSessionIndex,
		setcurSessionIndex,
		progress,
		setProgress,
	};
}
