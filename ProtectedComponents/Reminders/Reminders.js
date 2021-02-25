import React from "react";
import styles from "./Reminders.module.css";
import { Button } from "antd";

function Reminders() {
	return (
		<div className={styles.root}>
			<div className={styles.buttonContainer}>
				<Button type="primary" size="large">
					Student Sessions Reminder
				</Button>

				<Button type="primary" size="large">
					Tutor Sessions Reminder
				</Button>
				<Button type="primary" size="large">
					Homework Reminder
				</Button>
			</div>
		</div>
	);
}

export default Reminders;
