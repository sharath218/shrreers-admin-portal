import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const useAllGetStudentDetails = ({ id }) => {
	//	console.log(axios.defaults);
	//const id = "lorraine.wallace@hotmail.co.uk";
	function fetcher() {}
	const info = useQuery(
		"userDetails",
		() =>
			axios
				.get(`mutual/getUserDetails`, {
					params: {
						id: id,
					},
				})
				.then((res) => res.data),
		{
			staleTime: Infinity,
		}
	);
	console.log("indo", info);
	return info;
};

export default useAllGetStudentDetails;
