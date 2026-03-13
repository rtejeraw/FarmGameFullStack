import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { createUser, findUserBy } from "../services/users.js";
import { createInventory } from "../services/inventory.js";
import { createPlot } from "../services/plots.js";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError("Please provide name, email and password");
	}

	const user = await createUser({ ...req.body });
	const token = user.createJWT();

	//Create inventory
	await createInventory(user.id);
	//Create default plots
	for (let i = 0; i < 9; i++) {
		await createPlot({ user: user._id });
	}

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

	const user = await findUserBy({ email });
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
