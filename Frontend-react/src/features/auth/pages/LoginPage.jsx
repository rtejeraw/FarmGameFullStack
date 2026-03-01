import { Link } from "react-router";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
	return (
		<div>
			<div>
				<h1>Bienvenido</h1>
				<p>Inicia sesión para continuar</p>

				<LoginForm />

				<p>
					¿No tienes una cuenta?{" "}
					<Link to="/register">Regístrate aquí</Link>
				</p>
			</div>
		</div>
	);
}
