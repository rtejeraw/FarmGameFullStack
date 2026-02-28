import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticationMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("No token provided");
	}

	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: decoded.userId };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Not authorized");
	}
};

export default authenticationMiddleware;
