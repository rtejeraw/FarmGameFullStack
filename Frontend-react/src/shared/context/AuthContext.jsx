import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer, actions, initialStates } from "../reducer/states.reducer.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialStates);

	useEffect(() => {
		dispatch({ type: actions.CHECK_TOKEN });
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
