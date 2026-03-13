import { useAuth } from "../../../shared/context/AuthContext";
import { getInventory, getUser } from "../api/userApi";
import { useState, useEffect, useCallback } from "react";

export const useUser = () => {
	const { setLoading, setError, setInventory, setUser } = useAuth();
	const [reloadTrigger, setReloadTrigger] = useState(0);

	const fetchInventory = useCallback(async (signal) => {
		setLoading(true);
		try {
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
				const payload = JSON.parse(atob(storedToken.split(".")[1]));
				const user = await getUser(payload.userId);

				setUser(user);

				const data = await getInventory({ signal });
				setInventory(data);
			}
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
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetchInventory(signal);

		return () => {
			controller.abort();
		};
	}, [reloadTrigger, fetchInventory]);

	const refetch = () => {
		setReloadTrigger((prev) => prev + 1);
	};

	return { refetch };
};
