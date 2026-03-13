import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import {
	findUsers,
	findUser,
	editUser,
	removeUser,
} from "../services/users.js";

const getUsers = async (req, res) => {
	try {
		const users = await findUsers();
		res.status(StatusCodes.OK).json({ count: users.length, users });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const { id: userId } = req.params;

		const user = await findUser(userId);
		if (!user) {
			throw new NotFoundError(`No user with id ${userId}`);
		}
		res.status(StatusCodes.OK).json({ user });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const {
			params: { id: userId },
		} = req;

		const updatedUser = await editUser(userId, req.body);
		if (!updatedUser) {
			throw new NotFoundError(`No user with id ${userId}`);
		}
		res.status(StatusCodes.OK).json({ updatedUser });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id: userId } = req.params;

		const user = await removeUser(userId);
		if (!user) {
			throw new NotFoundError(`No user with id ${userId}`);
		}

		res.status(StatusCodes.OK).json({ msg: "The user entry was deleted." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

export { getUsers, getUser, updateUser, deleteUser };
