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

			// Guardamos en localStorage y actualizamos contexto global
			dispatch({
				type: actions.LOGIN_SUCCESS,
				payload: { token, user },
			});

			// Redirección (opcional, ya que RequireAuth lo puede manejar)
			navigate("/", { replace: true });
		} catch (err) {
			const message =
				err.response?.data?.message || "Error al iniciar sesión";
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

	return { login, isLoading: state.isLoading, error: state.errorMessage };
};
