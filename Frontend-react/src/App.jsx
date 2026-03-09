import styles from "./App.module.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { useAuth } from "./shared/context/AuthContext";

import Header from "./shared/components/Header";
import StatsBar from "./shared/components/StatsBar";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Market from "./features/market/pages/market";
// import homePage from "./pages/homePage";

function RequireAuth() {
	const { state } = useAuth();

	if (state.token === undefined) return <div>Cargando autenticación...</div>;
	if (state.token) {
		return <Outlet />;
	}
	return <Navigate to="/login" replace />;
}

function PublicOnly() {
	const { state } = useAuth();

	if (state.token === undefined) return <div>Cargando...</div>;
	if (state.token) return <Navigate to="/" replace />;
	return <Outlet />;
}

function App() {
	const { state, dispatch } = useAuth();

	return (
		<div className={styles["app"]}>
			<Header title={"Farm Game"} states={state} />
			<hr />
			<StatsBar
				Currency="100"
				Energy="100"
				states={state}
				dispatch={dispatch}
			/>
			<div className={styles["container"]}>
				<Routes>
					<Route element={<PublicOnly />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>

					<Route element={<RequireAuth />}>
						<Route path="/" element={<>home</>} />
						<Route path="/market" element={<Market />} />
					</Route>

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</div>
			<Toaster
				position="bottom-right" // esquina inferior derecha
				toastOptions={{
					duration: 4000, // 4 segundos (ajusta a tu gusto)
					style: {
						background: "#333",
						color: "#fff",
						borderRadius: "10px",
						padding: "12px 20px",
						fontSize: "16px",
						maxWidth: "400px",
					},
					error: {
						style: {
							background: "#ef4444", // rojo para errores
							color: "white",
						},
						iconTheme: {
							primary: "white",
							secondary: "#ef4444",
						},
					},
				}}
			/>
		</div>
	);
}

export default App;
