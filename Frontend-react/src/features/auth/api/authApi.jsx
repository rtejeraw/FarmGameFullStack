import { api } from "../../../shared/services/api";

export const loginUser = async (credentials) => {
	try {
		const response = await api.post("/auth/login", credentials);

		// Suponiendo que el backend devuelve algo como { token, user? }
		return response.data;
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.message
		) {
			throw new Error(error.response.data.message);
		}
		throw new Error("Error al conectar con el servidor");
	}
};

export const registerUser = async (userData) => {
	try {
		const response = await api.post("/auth/register", userData);
		return response.data;
	} catch (error) {
		if (
			error.response &&
			error.response.data &&
			error.response.data.message
		) {
			throw new Error(error.response.data.message);
		}
		throw new Error("Error al registrar usuario");
	}
};
