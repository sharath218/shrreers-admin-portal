import React, { useEffect, useState } from "react";
import useGetStudentInvoices from "../../../Hooks/useGetStudentInvoices";
import { Table, Tag, Space, Input, Button } from "antd";
import { Typography } from "antd";
import styles from "./StudentInvoice.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
import InvoiceTemplate from "../InvoiceTemplate/InvoiceTemplate";
// import Pdf from "react-to-pdf";
const ref = React.createRef();
// const options = {
// 	unit: "in",
// 	format: [4, 2],
// };
function StudntInvoice({ user_email, startdate, enddate, courses_price }) {
	const [name, setname] = useState("");
	const columns = [
		{
			title: "S.No",
			dataIndex: "serial_number",
			key: "s.no",
		},

		{
			title: "Student Name",
			dataIndex: "student_name",
			key: "student_name",
		},
		{
			title: "Subject Name",
			dataIndex: "subject_name",
			key: "subject_name",
		},
		{
			title: "Date",
			dataIndex: "student_side_date",
			render: (text, index) => <p>{moment(text).format("DD-MM-YYYY")}</p>,
		},
		{
			title: "Price",
			dataIndex: "price",
		},
	];
	const { data: courses, refetch, status } = useGetStudentInvoices(
		user_email,
		startdate,
		enddate
	);
	useEffect(() => {
		refetch();

		return () => {};
	}, [user_email, startdate, enddate]);
	if (status == "success") {
		courses[2].forEach((element) => {
			element.price = courses_price.filter(
				(item) => item.course_id == element.course_id
			)[0].price;
		});
		console.log(
			courses_price.filter((item) => item.course_id == "C_ID_2020000031")
		);
		console.log("date", courses[0][0].inv_id);
		return (
			<div className={styles.root}>
				<div className={styles.inputcontainer}>
					<div className={styles.row1}>
						<Title level={5}>Invoice For</Title>
						<Input
							onChange={(e) => setname(e.target.value)}
							placeholder="Type Name"
						/>
					</div>
					<div className={styles.row}>
						<Title level={5}>Invoice Date</Title>
						<span>
							{moment(courses[0][0].date_of_invoice).format("DD-MM-YYYY")}
						</span>
					</div>
					{/* <Pdf targetRef={ref} filename="invoice.pdf">
						{({ toPdf }) => (
							<Button
								onClick={toPdf}
								type="primary"
								className={styles.generate_button}
								style={{ background: "green" }}
								icon={<DownloadOutlined />}
							>
								Download Invoice
							</Button>
						)}
					</Pdf> */}
				</div>
				<Table
					pagination={false}
					bordered="true"
					dataSource={courses[2]}
					columns={columns}
				/>
				<div ref={ref} className={styles.tempcontainer}>
					<InvoiceTemplate
						inv_id={courses[0][0].inv_id}
						name={name}
						inv_date={moment(courses[0][0].date_of_invoice).format(
							"DD/MM/YYYY"
						)}
						table_data={courses[2]}
					/>
				</div>
			</div>
		);
	}
	return <div></div>;
}

export default StudntInvoice;
