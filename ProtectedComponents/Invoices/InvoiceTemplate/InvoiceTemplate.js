import React from "react";
import styles from "./InvoiceTemplate.module.css";
import { Table, Tag, Space, Input } from "antd";
import moment from "moment";

function InvoiceTemplate({ inv_id, name, inv_date, table_data }) {
	const columns = [
		{
			title: "S.no",
			dataIndex: "serial_number",
			key: "s.no",
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
		},
	];
	//console.log(table_data);
	const reducer = (accumulator, currentValue) =>
		accumulator + Number(currentValue.price);
	console.log(inv_id.slice(9, inv_id.length));
	return (
		<div className={styles.root}>
			<div className={styles.mainContainer}>
				<div className={styles.section1}>
					<img
						className={styles.logo}
						src="/shree_rsc_invoice_logo.svg"
						alt="LOGO"
					/>
					<div className={styles.titleContainer}>
						<span className={styles.title}>INVOICE</span>
						<div className={styles.invoicenumcontainer}>
							<span className={styles.subtitle1}>Invoice No.</span>
							<span className={styles.subtitle}>
								{inv_id.slice(9, inv_id.length)}
							</span>
						</div>
					</div>
				</div>
				<div className={styles.section2}>
					<div className={styles.line}>
						<span className={styles.fieldname}>Invoice For</span>
						<span className={styles.clientname}>{name}</span>
					</div>
					<div className={styles.line}>
						<span className={styles.fieldname}>Invoice Date </span>
						<span className={styles.date}>{inv_date} </span>
					</div>
					<div className={styles.infoContainer}>
						<span className={styles.info}>www.shreercstutors.com</span>
						<span className={styles.info}>Phone : +44785908390</span>
						<span className={styles.info}>
							Email : contact@shreersctutors.com
						</span>
					</div>
				</div>
				<div className={styles.section3}>
					<table className={styles.table}>
						<tr className={styles.tr}>
							<th className={styles.th}>S.No.</th>
							<th className={styles.th}>Student Name</th>
							<th className={styles.th}>Subject</th>
							<th className={styles.th}>Date</th>
							<th className={styles.th}>Price</th>
						</tr>
						<tbody>
							{table_data.map((item, index) => {
								return (
									<tr className={styles.tr} key={index}>
										<td className={styles.td}>{index}</td>
										<td className={styles.td}>{item.student_name}</td>
										<td className={styles.td}>{item.subject_name}</td>
										<td className={styles.td}>
											{moment(item.student_side_date).format("DD-MM-YYYY")}{" "}
										</td>
										<td className={styles.td}>{item.price}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<div className={styles.section4}>
					<span className={styles.price}>Grand Total: </span>
					<span className={styles.price}>{table_data.reduce(reducer, 0)}</span>
				</div>
				<div className={styles.section5}>
					<span className={styles.paymentheading}>You can pay via :</span>
					<span className={styles.paymentitem}>1. Paypal</span>
					<span className={styles.paymentitem}>2. Internet banking</span>
				</div>
				<div className={styles.footer}>
					{/* <img className={styles.logo} src="/invoice_footer.svg" alt="Footer" /> */}
					<span className={styles.footertext}>
						All Rights Reserved @ Shree RSC Tutors Pvt. Ltd.
					</span>
				</div>
			</div>
		</div>
	);
}

export default InvoiceTemplate;
