import styles from "./Button.module.css";

const Button = ({
	children,
	type = "button",
	onClick,
	disabled = false,
	isLoading = false,
	fullWidth = false,
	...props
}) => {
	return (
		<button
			className={`${styles["button"]}`}
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<span>Cargando...</span>
				</>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
