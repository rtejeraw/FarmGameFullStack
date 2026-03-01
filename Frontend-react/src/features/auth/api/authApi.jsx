import { api } from "../../../shared/services/api";

// Función para iniciar sesión
export const loginUser = async (credentials) => {
	try {
		const response = await api.post("/auth/login", credentials);

		// Suponiendo que el backend devuelve algo como { token, user? }
		return response.data;
	} catch (error) {
		// Propagamos el error para que el hook lo maneje
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

// Opcional: si también quieres una función para register
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
