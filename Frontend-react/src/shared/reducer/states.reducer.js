export const initialStates = {
	token: null,
	isAuthenticated: false,
	isLoading: true,
	user: null,
	inventory: null,
	units: [],
	plots: [],
	plot: null,
	errorMessage: "",
};

export const actions = {
	IS_LOADING: "is_loading",
	CHECK_TOKEN: "check_token",
	LOGIN_SUCCESS: "login_success",
	LOGIN_FAILURE: "login_failure",
	LOGOUT: "logout",
	SET_INVENTORY: "set_inventory",
	SET_USER: "set_user",
	SET_UNITS: "set_units",
	SET_PLOTS: "set_plots",
	SET_PLOT: "set_plot",
	SET_ERROR: "set_error",
	CLEAR_ERROR: "clear_error",
};

export function reducer(state = initialStates, action) {
	switch (action.type) {
		case actions.CHECK_TOKEN: {
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
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
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				isLoading: false,
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
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: null,
				errorMessage: "",
			};
		case actions.SET_INVENTORY:
			return { ...state, inventory: action.payload, errorMessage: "" };
		case actions.SET_USER:
			return { ...state, user: action.payload, errorMessage: "" };
		case actions.SET_UNITS:
			return { ...state, units: action.payload, errorMessage: "" };
		case actions.SET_PLOTS:
			return { ...state, plots: action.payload, errorMessage: "" };
		case actions.SET_PLOT:
			return { ...state, plot: action.payload, errorMessage: "" };
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
