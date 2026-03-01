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

		// Limpiar error del campo al escribir
		if (fieldErrors[name]) {
			setFieldErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = "El nombre es obligatorio";
		}

		if (!formData.email) {
			errors.email = "El correo es obligatorio";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "Correo inválido";
		}

		if (!formData.password) {
			errors.password = "La contraseña es obligatoria";
		} else if (formData.password.length < 6) {
			errors.password = "Mínimo 6 caracteres";
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Las contraseñas no coinciden";
		}

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		// Solo enviamos los campos necesarios al backend
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
				label="Nombre completo"
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				placeholder="Tu nombre"
				required
				error={fieldErrors.name}
			/>

			<Input
				label="Correo electrónico"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="tu@correo.com"
				required
				error={fieldErrors.email}
			/>

			<Input
				label="Contraseña"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Mínimo 6 caracteres"
				required
				error={fieldErrors.password}
			/>

			<Input
				label="Confirmar contraseña"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				placeholder="Repite la contraseña"
				required
				error={fieldErrors.confirmPassword}
			/>

			<FormError message={error} />

			<Button type="submit" isLoading={isLoading} fullWidth>
				{isLoading ? "Creando cuenta..." : "Registrarse"}
			</Button>
		</form>
	);
};
