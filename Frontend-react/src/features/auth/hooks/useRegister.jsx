import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/AuthContext";
import { registerUser } from "../api/authApi";
import { actions } from "../../../shared/reducer/states.reducer.js";

export const useRegister = () => {
	const { dispatch } = useAuth();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const register = async (userData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await registerUser(userData);

			// Suponiendo que el backend devuelve { token, user }
			const { token, user } = response;

			// Guardamos token y actualizamos estado global
			dispatch({
				type: actions.LOGIN_SUCCESS, // reutilizamos la acción de login
				payload: { token, user },
			});

			// Redirigir al home o dashboard
			navigate("/", { replace: true });
		} catch (err) {
			const message =
				err.response?.data?.message ||
				err.message ||
				"No pudimos crear la cuenta. Intenta nuevamente.";
			setError(message);

			dispatch({
				type: actions.LOGIN_FAILURE,
				payload: { message },
			});
		} finally {
			setIsLoading(false);
		}
	};

	return { register, isLoading, error };
};
