import React, { useEffect } from "react";

//Components
import { useAuth } from "../Server/useAuth";
import { useRouter } from "next/router";

function login() {
	const auth = useAuth();
	const router = useRouter();
	// useEffect(() => {
	// 	console.log(auth.user);
	// 	if (auth.user) {
	// 		router.push("/welcome");
	// 	}
	// }, [auth.user]);

	return (
		<div>
			<div></div>
		</div>
	);
}

export default login;
