import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const useGetAllEmails = (user_email, role) => {
	console.log(user_email, role);
	const info = useQuery(
		"InvoiceCourses",
		() =>
			axios
				.get(`admin/invoicecourses`, {
					params: {
						user_email: user_email,
						role: role,
					},
				})
				.then((res) => res.data),

		{
			manual: true,
		}
	);
	return info;
};

export default useGetAllEmails;
