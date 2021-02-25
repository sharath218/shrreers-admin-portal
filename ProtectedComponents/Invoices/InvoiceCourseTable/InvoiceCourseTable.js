import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Input } from "antd";
import StudntInvoice from "../StudentInvoice.js/StudntInvoice";
import { Switch } from "antd";
import styles from "./InvoiceCourseTable.module.css";
function InvoiceCourseTable({
	courseData,
	user_email,
	startdate,
	enddate,
	role,
}) {
	const [courses, setcourses] = useState(courseData);
	const [price, setprice] = useState(true);
	console.log(courses);
	useEffect(() => {
		setcourses(courseData);
	}, [courseData]);

	const onUpdate = (value, index) => {
		let indexD = courses.findIndex((item) => item.course_id == index.course_id);
		const newData = [...courses];
		newData[indexD].price = Number(value);
		console.log(newData[indexD]);
		setcourses(newData);
	};
	function onCheckChange(checked) {
		console.log(`switch to ${checked}`);
		setprice(checked);
	}
	const columns = [
		{
			title: "subject_name",
			dataIndex: "subject_name",
			key: "subject_name",
		},
		{
			title: "tutor_name",
			dataIndex: "tutor_name",
			key: "tutor_name",
		},
		{
			title: "student_name",
			dataIndex: "student_name",
			key: "student_name",
		},
		{
			title: "subject_name",
			dataIndex: "subject_name",
			key: "subject_name",
		},
		{
			title: "price",
			dataIndex: "price",
			key: "price",
			render: (text, index) => (
				<Input
					value={text}
					onChange={(e) => {
						onUpdate(e.target.value, index);
					}}
				></Input>
			),
		},
	];
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<p className={styles.option}>Edit Prices</p>
				<Switch onChange={onCheckChange} />
				<p className={styles.option}>Show Invoice </p>
			</div>
			{!price ? (
				<div style={{ width: "100%" }}>
					<Table bordered="true" dataSource={courses} columns={columns} />
				</div>
			) : role == 0 ? (
				<div style={{ width: "100%" }}>
					<StudntInvoice
						user_email={user_email}
						startdate={startdate}
						enddate={enddate}
						courses_price={courses}
					/>
				</div>
			) : null}
		</div>
	);
}

export default InvoiceCourseTable;
