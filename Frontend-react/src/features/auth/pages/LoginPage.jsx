import { Link } from "react-router";
import styles from "./LoginPage.module.css";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
	return (
		<div className={styles["container"]}>
			<div>
				<h1>Welcome</h1>
				<p>Log in to continue</p>
			</div>
			<LoginForm />

			<div>
				<p>Don't you have an account?</p>
				<a href="/register">Register here</a>
			</div>
		</div>
	);
}
