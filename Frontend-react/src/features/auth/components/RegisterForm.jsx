import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Button, Input, FormError } from "../../../shared/components";

export const RegisterForm = () => {
	const { register, isLoading, error } = useRegister();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [fieldErrors, setFieldErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (fieldErrors[name]) {
			setFieldErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = "Name is required";
		}

		if (!formData.email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Invalid email";
		}

		if (!formData.password) {
			errors.password = "Password is required";
		} else if (formData.password.length < 6) {
			errors.password = "Minimum 6 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		const payload = {
			name: formData.name.trim(),
			email: formData.email.trim(),
			password: formData.password,
		};

		await register(payload);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Name"
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
				error={fieldErrors.name}
			/>

			<Input
				label="Email"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
				error={fieldErrors.email}
			/>

			<Input
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
				error={fieldErrors.password}
			/>

			<Input
				label="Confirm Password"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				required
				error={fieldErrors.confirmPassword}
			/>

			<Button type="submit" isLoading={isLoading} fullWidth>
				{isLoading ? "Creating account..." : "Register"}
			</Button>

			<FormError message={error} />
		</form>
	);
};
