import React from "react";
import NavBar_Side from "../ProtectedComponents/NavBar_Side/NavBar_Side";
import Invoices from "../ProtectedComponents/Invoices/Invoices";
import styles from "../ProtectedComponents/Invoices/Invoices.module.css";
function invoices() {
	return (
		<div>
			<NavBar_Side />
			<div style={{ position: "absolute", left: "20%", width: "80%" }}>
				<div className={styles.header}>
					<h1>INVOICES</h1>
				</div>
				<Invoices />
			</div>
		</div>
	);
}

export default invoices;
