import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, Input, FormError } from "../../../shared/components";

export const LoginForm = () => {
	const { login, isLoading, error } = useLogin();

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

			{error && <FormError message={error} />}

			<Button type="submit" isLoading={isLoading} fullWidth>
				{isLoading ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
};
