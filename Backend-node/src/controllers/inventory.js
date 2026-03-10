import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import {
	findInventory,
	createInventory,
	editInventory,
	removeInventory,
	buySellInventory,
	consumeInventory,
} from "../services/inventory.js";
import { findUser } from "../services/users.js";

const getInventory = async (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new UnauthenticatedError("No token provided");
		}

		const token = authHeader.split(" ")[1];
		const payload = JSON.parse(atob(token.split(".")[1]));

		const inventory = await findInventory(payload.userId);
		res.status(StatusCodes.OK).json(inventory);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const newInventory = async (req, res) => {
	try {
		const userId = req.body.user;
		const user = findUser(userId);
		if (!user) {
			throw new BadRequestError(`No user with id ${userId}`);
		}

		const inventory = await createInventory(userId);

		res.status(StatusCodes.CREATED).json({ inventory });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const updateInventory = async (req, res) => {
	try {
		const {
			params: { id: inventoryId },
			body: { unit: unitId, amount: amount },
		} = req;

		const inventory = await editInventory(inventoryId, unitId, amount);
		res.status(StatusCodes.OK).json({ inventory });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const deleteInventory = async (req, res) => {
	try {
		const { id: inventoryId } = req.params;

		const inventory = await removeInventory(inventoryId);
		if (!inventory) {
			throw new NotFoundError(`No inventory with id ${inventoryId}`);
		}

		res.status(StatusCodes.OK).json({
			msg: "The inventory entry was deleted.",
		});
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const buySellUnit = async (req, res) => {
	try {
		const {
			params: { id: inventoryId },
			body: { user: userId, unit: unitId, amount: amount },
		} = req;

		const inventory = await buySellInventory(inventoryId, unitId, amount);
		if (!inventory) throw new BadRequestError("Error");

		res.status(StatusCodes.OK).json({ msg: "Unit purchased." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const consumeUnit = async (req, res) => {
	try {
		const {
			params: { id: inventoryId },
			body: { unit: unitId },
		} = req;

		const inventory = await consumeInventory(inventoryId, unitId);
		if (!inventory) throw new BadRequestError("Error");

		res.status(StatusCodes.OK).json({ msg: "Unit consumed." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

export {
	getInventory,
	newInventory,
	updateInventory,
	deleteInventory,
	buySellUnit,
	consumeUnit,
};
