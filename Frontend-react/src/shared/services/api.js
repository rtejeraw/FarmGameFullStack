import axios from "axios";
import { useNavigate } from "react-router";

export const api = axios.create({
	baseURL: "/api/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor to add token to headers
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Interceptor to handle responses (token expiration)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			const navigate = useNavigate();
			navigate("/login", { replace: true });
		}
		return Promise.reject(error);
	},
);
