import React, { useState } from "react";
import styles from "./Invoices.module.css";
import useGetAllEmails from "../../Hooks/useGetAllEmails";
import { AutoComplete, Button } from "antd";
import { DatePicker, Space } from "antd";
import InvoiceCourse from "./InvoiceCourses/InvoiceCourse";
import InvoiceTemplate from "./InvoiceTemplate/InvoiceTemplate";
import { Spin } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
function Invoices() {
	const { data: allemails, isLoading, status } = useGetAllEmails();

	const [inpvalue, setinpvalue] = useState(null);
	const [user_email, setuser_email] = useState(null);
	const [startdate, setstartdate] = useState(null);
	const [enddate, setenddate] = useState(null);
	const [role, setrole] = useState(null);
	const [show, setshow] = useState(false);
	//console.log(allemails[0]);
	console.log(inpvalue);
	const onChange = (value, dateString) => {
		console.log(dateString);
		setstartdate(dateString[0]);
		setenddate(dateString[1]);
	};
	const dateFormat = "YYYY/MM/DD";
	if (status == "success") {
		return (
			<div className={styles.root}>
				<div className={styles.section1}>
					<div>
						<AutoComplete
							style={{
								width: 200,
							}}
							options={allemails[0]}
							placeholder="select email"
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
								-1
							}
							onChange={setinpvalue}
						/>
						<Space direction="vertical" size={12}>
							<RangePicker onChange={onChange} format={dateFormat} />
						</Space>
					</div>
					<Button
						onClick={() => {
							setuser_email(inpvalue),
								setrole(
									allemails[0].filter((item) => item.value == inpvalue)[0]
										.user_role
								);
							setshow(true);
						}}
						type="primary"
						className={styles.generate_button}
					>
						Generate Invoice
					</Button>
				</div>
				{show ? (
					<div>
						<InvoiceCourse
							user_email={user_email}
							role={role}
							startdate={startdate}
							enddate={enddate}
						/>
					</div>
				) : null}

				{/* <InvoiceTemplate /> */}
			</div>
		);
	}
	return (
		<div className={styles.root}>
			<div className={styles.section1}>
				<Spin size="large" />
			</div>
		</div>
	);
}

export default Invoices;
