import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";
import { reducer, actions, initialStates } from "../reducer/states.reducer.js";
import { getUser, getInventory } from "../../features/user/api/userApi.jsx";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialStates);

	useEffect(() => {
		dispatch({ type: actions.CHECK_TOKEN });
	}, []);

	const loginSuccess = (token, user) => {
		dispatch({
			type: actions.LOGIN_SUCCESS,
			payload: { token, user },
		});
	};

	const loginFailure = (message) => {
		dispatch({
			type: actions.LOGIN_FAILURE,
			payload: { message },
		});
	};

	const logOut = () => {
		dispatch({
			type: actions.LOGOUT,
		});
	};

	const setError = (message) => {
		dispatch({
			type: actions.SET_ERROR,
			payload: { message: message },
		});
	};

	const setLoading = (isLoading) => {
		dispatch({
			type: actions.IS_LOADING,
			payload: { isLoading: isLoading },
		});
	};

	const setInventory = (inventory) => {
		dispatch({
			type: actions.SET_INVENTORY,
			payload: inventory,
		});
	};

	const setUser = (user) => {
		dispatch({
			type: actions.SET_USER,
			payload: user,
		});
	};

	const setUnits = (units) => {
		dispatch({
			type: actions.SET_UNITS,
			payload: units,
		});
	};

	const setPlots = (plots) => {
		dispatch({
			type: actions.SET_PLOTS,
			payload: plots,
		});
	};
	const setPlot = (plot) => {
		dispatch({
			type: actions.SET_PLOT,
			payload: plot,
		});
	};

	const [reloadTrigger, setReloadTrigger] = useState(0);

	const fetchData = async () => {
		if (!state.token) return;

		const payload = JSON.parse(atob(state.token.split(".")[1]));
		const user = await getUser(payload.userId);
		setUser(user);

		const inventory = await getInventory();
		setInventory(inventory);
	};

	useEffect(() => {
		fetchData();
	}, [state.token, reloadTrigger]);

	const refetchContext = () => {
		setReloadTrigger((prev) => prev + 1);
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				refetchContext,
				loginSuccess,
				loginFailure,
				logOut,
				setError,
				setLoading,
				setInventory,
				setUser,
				setUnits,
				setPlots,
				setPlot,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
