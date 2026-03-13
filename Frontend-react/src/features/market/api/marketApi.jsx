import { api } from "../../../shared/services/api";

export const getUnits = async ({ signal } = {}) => {
	try {
		const response = await api.get("/units?type=Seed&type=Breed", {
			signal,
		});

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

		const response = await api.post(`/inventory/units/${inventory}`, body);

		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data?.message || "Bad request error",
			);
		} else if (error.request) {
			throw new Error("No server response");
		} else {
			throw error;
		}
	}
};

export const eatUnit = async ({ inventory, unit } = {}) => {
	try {
		const body = {
			unit: unit,
		};
		const response = await api.delete(`/inventory/units/${inventory}`, {
			data: body,
		});
		return response.data;
	} catch (error) {
		if (error.response?.data?.message) {
			throw new Error(error.response.data.message);
		}
	}
};
