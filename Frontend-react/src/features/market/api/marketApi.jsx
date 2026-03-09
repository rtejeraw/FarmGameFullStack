import { api } from "../../../shared/services/api";

export const getUnits = async ({ signal } = {}) => {
	try {
		const response = await api.get("/units", { signal });

		return response.data;
	} catch (error) {
		if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
			console.log("Petición cancelada (esperado en StrictMode dev)");
			return null;
		}
		if (error.response?.data?.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error("Error al conectar con el servidor");
	}
};

export const buySellUnits = async ({ inventory, user, unit, amount } = {}) => {
	try {
		const body = {
			user,
			unit,
			amount,
		};

		const response = await api.post(`/inventory/${inventory}`, body);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data?.msg || "Bad request error");
		} else if (error.request) {
			throw new Error("No server response");
		} else {
			throw error;
		}
	}
};
