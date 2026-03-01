export const initialStates = {
	token: null,
	isAuthenticated: false,
	isLoading: true,
	user: null,
	errorMessage: "",
};

export const actions = {
	IS_LOADING: "set_loading",
	CHECK_TOKEN: "check_token",
	LOGIN_SUCCESS: "login_success",
	LOGIN_FAILURE: "login_failure",
	LOGOUT: "logout",
	SET_ERROR: "set_error",
	CLEAR_ERROR: "clear_error",
};

export function reducer(state = initialStates, action) {
	switch (action.type) {
		case actions.CHECK_TOKEN: {
			const storedToken = localStorage.getItem("token");
			// Podrías validar aquí si el token es válido (por ejemplo, no expirado)
			// Por simplicidad, solo comprobamos si existe
			if (storedToken) {
				// Opcional: podrías decodificar el token para obtener user info
				// const user = decodeToken(storedToken);
				return {
					...state,
					token: storedToken,
					isAuthenticated: true,
					isLoading: false,
					errorMessage: "",
				};
			} else {
				return {
					...state,
					token: null,
					isAuthenticated: false,
					isLoading: false,
					user: null,
					errorMessage: "",
				};
			}
		}
		case actions.LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			// Opcional: guardar más datos si el backend devuelve user info
			// localStorage.setItem("user", JSON.stringify(action.payload.user));
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload.user || null,
				errorMessage: "",
			};

		case actions.LOGIN_FAILURE:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: null,
				errorMessage:
					action.payload?.message || "Error al iniciar sesión",
			};

		case actions.LOGOUT:
			localStorage.removeItem("token");
			// localStorage.removeItem("user"); // si lo guardaste
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: null,
				errorMessage: "",
			};

		case actions.SET_ERROR:
			return {
				...state,
				errorMessage: action.payload?.message || "Error desconocido",
			};

		case actions.CLEAR_ERROR:
			return {
				...state,
				errorMessage: "",
			};

		case actions.SET_LOADING:
			return {
				...state,
				isLoading: action.payload?.isLoading || false,
			};

		default:
			return state;
	}
}
