import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { AuthProvider } from "./shared/context/AuthContext";
import { useAuth } from "./shared/context/AuthContext";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
// import homePage from "./pages/homePage";

function RequireAuth() {
	const { state } = useAuth();

	if (state.token === undefined) return <div>Cargando autenticación...</div>;
	if (state.token) return <Outlet />;
	return <Navigate to="/login" replace />;
}

function PublicOnly() {
	const { state } = useAuth();

	if (state.token === undefined) return <div>Cargando...</div>;
	if (state.token) return <Navigate to="/" replace />;
	return <Outlet />;
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<PublicOnly />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>

					<Route element={<RequireAuth />}>
						<Route path="/" element={<>home</>} />
						{/* más rutas protegidas */}
					</Route>

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
