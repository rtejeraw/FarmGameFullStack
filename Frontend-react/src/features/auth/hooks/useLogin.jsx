import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/AuthContext";
import { loginUser } from "../api/authApi";

export const useLogin = () => {
	const { loginSuccess, loginFailure, logOut, setError, setLoading } =
		useAuth();
	const navigate = useNavigate();

	const login = async (credentials) => {
		try {
			const { token, user } = await loginUser(credentials);
			loginSuccess(token, user);

			navigate("/", { replace: true });
		} catch (err) {
			const message = err.response?.data?.message || "Error logging in";
			setError(message);
			loginFailure(message);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		try {
			logOut();
			navigate("/login", { replace: true });
		} catch (err) {
			const message = err.response?.data?.message || "Error logging out";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		login,
		logout,
	};
};
