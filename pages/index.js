import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "antd";
import NavBar_Side from "../ProtectedComponents/NavBar_Side/NavBar_Side";
export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar_Side />
		</div>
	);
}
