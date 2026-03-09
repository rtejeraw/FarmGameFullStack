import { React, useId } from "react";
import styles from "./Select.module.css";

const Select = ({
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
	const selectId = id || generatedId;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<select
					className={styles.select}
					id={selectId}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					{...props}
				>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>

				{label && (
					<label htmlFor={selectId} className={styles.label}>
						{label}
						{required && <span className={styles.required}></span>}
					</label>
				)}
			</div>
		</div>
	);
};

export default Select;
