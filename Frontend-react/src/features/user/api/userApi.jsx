import { api } from "../../../shared/services/api";

export const getInventory = async ({ signal } = {}) => {
	try {
		const response = await api.get("/inventory", { signal });

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
