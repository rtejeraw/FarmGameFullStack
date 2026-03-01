import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/AuthContext";
import { loginUser } from "../api/authApi";
import { actions } from "../../../shared/reducer/states.reducer";

export const useLogin = () => {
	const { state, dispatch } = useAuth();
	const navigate = useNavigate();

	const login = async (credentials) => {
		try {
			const { token, user } = await loginUser(credentials);

			dispatch({
				type: actions.LOGIN_SUCCESS,
				payload: { token, user },
			});

			navigate("/", { replace: true });
		} catch (err) {
			const message = err.response?.data?.message || "Error logging in";
			dispatch({
				type: actions.SET_ERROR,
				payload: { message: message },
			});
			dispatch({
				type: actions.LOGIN_FAILURE,
				payload: { message },
			});
		} finally {
			dispatch({
				type: actions.SET_LOADING,
				payload: { isLoading: false },
			});
		}
	};

	const logout = () => {
		try {
			dispatch({
				type: actions.LOGOUT,
			});
			navigate("/login", { replace: true });
		} catch (err) {
			const message = err.response?.data?.message || "Error logging out";
			dispatch({
				type: actions.SET_ERROR,
				payload: { message: message },
			});
		} finally {
			dispatch({
				type: actions.SET_LOADING,
				payload: { isLoading: false },
			});
		}
	};

	return {
		login,
		logout,
		isLoading: state.isLoading,
		error: state.errorMessage,
	};
};
