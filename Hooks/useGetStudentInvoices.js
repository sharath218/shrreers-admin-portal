import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const useGetAllEmails = (user_email, startdate, enddate) => {
	console.log(user_email, startdate, enddate);

	const info = useQuery(
		"studentinvoice",
		() =>
			axios
				.get(`admin/studentinvoice`, {
					params: {
						user_email: user_email,
						startdate: startdate,
						enddate: enddate,
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
