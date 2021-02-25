import React from "react";
import NavBar_Side from "../ProtectedComponents/NavBar_Side/NavBar_Side";
import Reminders from "../ProtectedComponents/Reminders/Reminders";
function reminders() {
	return (
		<div>
			<NavBar_Side />
			<div style={{ position: "absolute", left: "20%", width: "75%" }}>
				<Reminders />
			</div>
		</div>
	);
}

export default reminders;
