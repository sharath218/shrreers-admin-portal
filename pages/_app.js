import "antd/dist/antd.css";
import "../styles/globals.css";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;
console.log(process.env.NEXT_PUBLIC_AXIOS_BASE_URL);

function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
