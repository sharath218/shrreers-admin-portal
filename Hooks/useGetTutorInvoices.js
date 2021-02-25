import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const useGetAllEmails = (user_email) => {
	console.log(user_email, role);
	const info = useQuery(
		"tutorinvoice",
		() =>
			axios
				.get(`admin/tutorinvoice`, {
					params: {
						user_email: user_email,
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
