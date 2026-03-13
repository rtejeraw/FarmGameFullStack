import { api } from "../../../shared/services/api";

export const getPlots = async ({ signal } = {}) => {
	try {
		const response = await api.get("/plots", {
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

export const plantUnitPlot = async ({ plotId, unitId }) => {
	try {
		const body = {
			unit: unitId,
		};

		const response = await api.post(`/plots/plant/${plotId}`, body);

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

export const harvestUnitPlot = async ({ plotId }) => {
	try {
		const response = await api.delete(`/plots/plant/${plotId}`);

		return response.data;
	} catch (error) {
		if (error.response?.data?.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error("Error al conectar con el servidor");
	}
};
