import { RegisterForm } from "../components/RegisterForm";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
	return (
		<div className={styles["container"]}>
			<div>
				<h1>Register</h1>
				<p>Complete the form to register</p>
			</div>
			<RegisterForm />
			<div>
				<p>Do you have an account?</p>
				<a href="/login">Log in here</a>
			</div>
		</div>
	);
}
