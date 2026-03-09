import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer, actions, initialStates } from "../reducer/states.reducer.js";

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
			type: actions.SET_LOADING,
			payload: { isLoading: isLoading },
		});
	};

	const setInventory = (inventory) => {
		dispatch({
			type: actions.SET_INVENTORY,
			payload: inventory,
		});
	};

	const setUnits = (units) => {
		dispatch({
			type: actions.SET_UNITS,
			payload: units,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				loginSuccess,
				loginFailure,
				logOut,
				setError,
				setLoading,
				setInventory,
				setUnits,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
