import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError("Please provide name, email and password");
	}

	const user = await User.create({ ...req.body });
	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name,
			email: user.email,
			energy: user.energy,
			coins: user.coins,
		},
		token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) throw new UnauthenticatedError("Invalid Credentials");

	if (!(await user.checkPassword(password)))
		throw new UnauthenticatedError("Invalid Credentials");

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user: {
			Id: user._id,
			name: user.name,
			email: user.email,
			energy: user.energy,
			coins: user.coins,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		},
		token,
	});
};

export { register, login };
