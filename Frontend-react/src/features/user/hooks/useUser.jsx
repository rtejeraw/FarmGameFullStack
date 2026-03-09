import { useAuth } from "../../../shared/context/AuthContext";
import { getInventory } from "../api/userApi";
import { useEffect } from "react";

export const useUser = () => {
	const { setLoading, setError, setInventory } = useAuth();

	const fetchInventory = async ({ signal }) => {
		setLoading(true);
		try {
			const data = await getInventory({ signal });

			setInventory(data);
		} catch (err) {
			if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
				const message = err.message || "Error fetching inventory";

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

		fetchInventory({ signal });
		return () => {
			controller.abort();
		};
	}, []);
};
