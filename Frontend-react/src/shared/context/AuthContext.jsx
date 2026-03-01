import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer, actions, initialState } from "../reducer/states.reducer.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: actions.checkToken });
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
