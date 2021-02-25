import React, { useEffect, useState } from "react";
import useGetInvoiceCourses from "../../../Hooks/useGetInvoiceCourses";
import { Table, Tag, Space, Input } from "antd";
import InvoiceCourseTable from "../InvoiceCourseTable/InvoiceCourseTable";
import { Spin } from "antd";

function InvoiceCourse({ user_email, role, startdate, enddate }) {
	const [coursesD, setcoursesD] = useState([]);
	const { data: courses, refetch, status } = useGetInvoiceCourses(
		user_email,
		role
	);

	useEffect(() => {
		refetch();

		return () => {};
	}, [user_email]);

	//console.log(role[0].user_role);
	if (status == "success") {
		//setcoursesD(courses[0]);

		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					width: "100%",
					alignItems: "center",
				}}
			>
				<InvoiceCourseTable
					user_email={user_email}
					startdate={startdate}
					enddate={enddate}
					courseData={courses[0]}
					role={role}
				/>
			</div>
		);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				width: "100%",
				alignItems: "center",
			}}
		>
			<Spin size="large" />
		</div>
	);
}

export default InvoiceCourse;
