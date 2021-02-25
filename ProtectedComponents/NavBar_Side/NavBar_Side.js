import React from "react";
import styles from "./NavBar_Side.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Clock from "react-live-clock";
import moment from "moment";
import { Tag } from "antd";

function NavBar_Side() {
	const router = useRouter();
	return (
		<div className={styles.root}>
			<div className={styles.logoContainer}>
				<Link href="/welcome">
					<img className={styles.logo} src="/shreersc_logo.svg" alt="LOGO" />
				</Link>
				<Tag color="#0099FF">
					<Clock
						format={"h:mm:ss A"}
						ticking={true}
						children={Date}
						className={styles.day}
					/>
				</Tag>
				<Tag color="#FF6A2B" className={styles.date}>
					{moment().format("MMMM Do YYYY")}
				</Tag>
			</div>
			<div className={styles.navItemsContainer}>
				<Link href="/dashboard">
					<span
						className={
							router.pathname == "/dashboard"
								? styles.navlinksactive
								: styles.navlinks
						}
					>
						Dashboard
					</span>
				</Link>
				<Link href="/homework">
					<span
						className={
							router.pathname == "/homework"
								? styles.navlinksactive
								: styles.navlinks
						}
					>
						Homework
					</span>
				</Link>
				<Link href="/">
					<span
						className={
							router.pathname == "/" ? styles.navlinksactive : styles.navlinks
						}
					>
						People
					</span>
				</Link>
				<Link href="/invoices">
					<span
						className={
							router.pathname == "/invoices"
								? styles.navlinksactive
								: styles.navlinks
						}
					>
						Invoices
					</span>
				</Link>
				<Link href="/reminders">
					<span
						className={
							router.pathname == "/reminders"
								? styles.navlinksactive
								: styles.navlinks
						}
					>
						Reminders
					</span>
				</Link>
			</div>
		</div>
	);
}

export default NavBar_Side;
