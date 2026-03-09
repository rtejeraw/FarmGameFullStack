import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../../../shared/context/AuthContext";
import { Button, Input, FormError } from "../../../shared/components";

export const LoginForm = () => {
	const { login } = useLogin();
	const { state } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="email"
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<Input
				type="password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			{state.errorMessage && <FormError message={state.errorMessage} />}

			<Button type="submit" isLoading={state.isLoading} fullWidth>
				{state.isLoading ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
};
