import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const useGetAllEmails = () => {
	const info = useQuery("allemails", () =>
		axios.get(`admin/allemails`).then((res) => res.data)
	);
	return info;
};

export default useGetAllEmails;
