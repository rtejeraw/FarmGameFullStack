import { Link } from "react-router";
import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {
	return (
		<div>
			<div>
				<h1>Regístrate</h1>
				<p>Completa el formulario para registrarte</p>

				<RegisterForm />

				<p>
					¿No tienes una cuenta?{" "}
					<Link to="/login">Inicia sesión aquí</Link>
				</p>
			</div>
		</div>
	);
}
