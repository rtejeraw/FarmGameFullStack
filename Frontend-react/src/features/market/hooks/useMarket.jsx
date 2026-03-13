import { useAuth } from "../../../shared/context/AuthContext";
import { getUnits, buySellUnits, eatUnit } from "../api/marketApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useMarket = () => {
	const { state, setLoading, setError, setUnits, refetchContext } = useAuth();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetchUnits({ signal });
		return () => {
			controller.abort();
		};
	}, []);

	const fetchUnits = async ({ signal }) => {
		setLoading(true);

		try {
			const data = await getUnits({ signal });

			if (data && data.units) {
				setUnits(data.units);
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

	const useBuyUnits = async ({ inventory, user, unit, amount }) => {
		try {
			setLoading(true);

			amount = Number(amount);

			await buySellUnits({
				inventory: inventory,
				user: user,
				unit: unit,
				amount: amount,
			});
			toast.success(
				amount > 0
					? "The purchase was a success"
					: "The sale was a success.",
			);
			refetchContext();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const useSellUnits = async ({ inventory, user, unit, amount }) => {
		try {
			setLoading(true);

			amount = Number(amount) * -1;

			await buySellUnits({
				inventory: inventory,
				user: user,
				unit: unit,
				amount: amount,
			});
			toast.success(
				amount > 0
					? "The purchase was a success"
					: "The sale was a success.",
			);
			refetchContext();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const consumeUnit = async ({ inventory, unit }) => {
		try {
			setLoading(true);

			await eatUnit({
				inventory: inventory,
				unit: unit,
			});
			toast.success("The energy gain was a success.");
			refetchContext();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		state,
		useBuyUnits,
		useSellUnits,
		consumeUnit,
	};
};
