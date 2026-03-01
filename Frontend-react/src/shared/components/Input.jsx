import React from "react";

const Input = ({
	label,
	type = "text",
	value,
	onChange,
	placeholder,
	required = false,
	error,
	...props
}) => {
	return (
		<div>
			{label && (
				<label>
					{label}
					{required && <b>*</b>}
				</label>
			)}

			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				{...props}
			/>

			{error && <p>{error}</p>}
		</div>
	);
};

export default Input;
