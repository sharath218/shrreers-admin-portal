import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useRequireAuth(redirectUrl = "/login") {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		//console.log("auth.user", auth.user);
		const localuser = JSON.parse(localStorage.getItem("user"));
		//	console.log("localuser", localuser);
		if (
			!localuser ||
			(localuser.length < 1 && (auth.user == null || undefined))
		) {
			router.push(redirectUrl);
		}
	}, [auth, router]);

	return auth;
}

// export async function getServerSideProps(context) {
//   var propsObject = {
//     authenticated: false,
//     usermail: "",
//     emails: "",
//     uids: "",
//     isuser: false,
//   };

//   const cookies = parseCookies(context);

//   try {
//     console.log(JSON.stringify(cookies, null, 2));
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
//     const { uid, email } = token;
//     console.log("token :", token);
//     if (uid) {
//       propsObject.isuser = true;
//       propsObject.uids = uid;
//       propsObject.emails = email;
//       console.log("uid,email", uid, email);
//     }
//   } catch (err) {
//     console.log("err", err);
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }

//   // if (cookies.user) {
//   //   const authentication = await verifyCookie(cookies.user);
//   //   propsObject.authenticated = authentication
//   //     ? authentication.authenticated
//   //     : false;
//   //   propsObject.usermail = authentication ? authentication.usermail : "";
//   // }

//   return {
//     props: propsObject, // will be passed to the page component as props
//   };
// }
