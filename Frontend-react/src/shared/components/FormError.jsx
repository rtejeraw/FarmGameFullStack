import React from "react";

const FormError = ({ message }) => {
	if (!message) return null;

	return (
		<div>
			<b>Error:</b> {message}
		</div>
	);
};

export default FormError;
