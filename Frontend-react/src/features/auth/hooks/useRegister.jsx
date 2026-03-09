import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/AuthContext";
import { registerUser } from "../api/authApi";

export const useRegister = () => {
	const { loginSuccess, loginFailure, setLoading, setError } = useAuth();
	const navigate = useNavigate();

	const register = async (userData) => {
		setLoading(true);
		setError(null);

		try {
			const response = await registerUser(userData);

			// Suponiendo que el backend devuelve { token, user }
			const { token, user } = response;

			// Guardamos token y actualizamos estado global
			loginSuccess(token, user);

			// Redirigir al home o dashboard
			navigate("/", { replace: true });
		} catch (err) {
			const message =
				err.response?.data?.message ||
				err.message ||
				"No pudimos crear la cuenta. Intenta nuevamente.";
			setError(message);

			loginFailure(message);
		} finally {
			setLoading(false);
		}
	};

	return { register };
};
