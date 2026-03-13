import { useAuth } from "../../../shared/context/AuthContext";
import { getPlots, plantUnitPlot, harvestUnitPlot } from "../api/plotApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const usePlot = () => {
	const { state, setLoading, setError, setPlots, setPlot, refetchContext } =
		useAuth();
	const [reloadTrigger, setReloadTrigger] = useState(0);

	const selectPlot = async (plot) => {
		try {
			setPlot(plot);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const plantUnit = async ({ plotId, unitId }) => {
		setLoading(true);
		try {
			const data = await plantUnitPlot({ plotId, unitId });
			if (data?.msg) toast.success(data?.msg);
			refetchContext();
			refetchLand();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const harvestUnit = async ({ plotId }) => {
		setLoading(true);
		try {
			const data = await harvestUnitPlot({ plotId });
			if (data?.msg) toast.success(data?.msg);
			refetchContext();
			refetchLand();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchPlots = async ({ signal }) => {
		setLoading(true);
		setPlot(null);
		setPlots(null);

		try {
			const data = await getPlots({ signal });

			if (data && data.plots) {
				setPlots(data.plots);
			}
		} catch (err) {
			if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
				const message = err.message || "Error fetching units";

				setError(message);
			}
		} finally {
			if (!signal.aborted) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetchPlots({ signal });
		return () => {
			controller.abort();
		};
	}, [reloadTrigger]);

	const refetchLand = () => {
		setReloadTrigger((prev) => prev + 1);
	};

	return {
		state,
		selectPlot,
		plantUnit,
		harvestUnit,
		refetchLand,
	};
};
