import { React, useId } from "react";
import styles from "./Input.module.css";

const Input = ({
	label,
	type = "text",
	value,
	onChange,
	placeholder = " ",
	required = false,
	id,
	...props
}) => {
	const generatedId = useId();
	const inputId = id || generatedId;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<input
					id={inputId}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className={styles.input}
					{...props}
				/>

				{label && (
					<label htmlFor={inputId} className={styles.label}>
						{label}
						{required && <span className={styles.required}></span>}
					</label>
				)}
			</div>
		</div>
	);
};

export default Input;
