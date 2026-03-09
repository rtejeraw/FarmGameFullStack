import Inventory from "../models/Inventory.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Unit from "../models/Unit.js";
import User from "../models/User.js";

const getInventory = async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("No token provided");
	}

	const token = authHeader.split(" ")[1];
	const payload = JSON.parse(atob(token.split(".")[1]));

	const inventory = await Inventory.findOne({
		user: payload.userId,
	})
		.populate("seeds.unit")
		.populate("crops.unit")
		.populate("breeds.unit")
		.populate("animals.unit");
	res.status(StatusCodes.OK).json(inventory);
};

const newInventory = async (req, res) => {
	const userId = req.body.user;
	const user = User.findById(userId);
	if (!user) {
		throw new BadRequestError(`No user with id ${userId}`);
	}

	const inventory = await Inventory.create(req.body);

	res.status(StatusCodes.CREATED).json({ inventory });
};

const updateInventory = async (req, res) => {
	const {
		params: { id: inventoryId },
		body: { unit: unitId, amount: amount },
	} = req;

	const inventory = await Inventory.findById(inventoryId);
	if (!inventory) {
		throw new NotFoundError("Inventary not found");
	}

	//const unit = await getUnit({ params: { id: unitId } });
	const unit = await Unit.findOne({
		_id: unitId,
	});
	if (!unit) {
		throw new NotFoundError("Unit not found");
	}

	const inventoryList = unit.type.toLowerCase() + "s";
	const item = inventory[inventoryList].find(
		(item) => item.unit.toString() === unitId,
	);
	const index = inventory[inventoryList].findIndex(
		(item) => item.unit.toString() === unitId,
	);
	if (item) {
		const newAmount = (item.amount += amount);
		if (newAmount <= 0) {
			inventory[inventoryList].splice(index, 1);
		}
		item.amount = newAmount;
	} else {
		inventory[inventoryList].push({
			unit: unitId,
			amount: amount,
		});
	}

	await inventory.save();

	res.status(StatusCodes.OK).json({ inventory });
};

const deleteInventory = async (req, res) => {
	const { id: inventoryId } = req.params;

	const inventory = await Inventory.findByIdAndDelete({ _id: inventoryId });
	if (!inventory) {
		throw new NotFoundError(`No inventory with id ${inventoryId}`);
	}

	res.status(StatusCodes.OK).json({
		msg: "The inventory entry was deleted.",
	});
};

const buySellUnit = async (req, res) => {
	const {
		params: { id: inventoryId },
		body: { user: userId, unit: unitId, amount: amount },
	} = req;

	const user = await User.findById({ _id: userId });
	if (!user) throw new NotFoundError(`No user with id ${userId}`);

	const unit = await Unit.findById({ _id: unitId });
	if (!unit) throw new NotFoundError(`No unit with id ${unitId}`);

	const coinCost = unit.coinCost * amount;
	if (amount > 0 && user.coins < coinCost)
		throw new BadRequestError("You don't have enough coins.");

	user.coins -= coinCost;
	await user.save();

	const inventoryRes = await updateInventory(req, res);
	if (inventoryRes.status != StatusCodes.OK) {
		throw new BadRequestError("Error");
	}

	res.status(StatusCodes.OK).json({ msg: "Unit purchased." });
};

export {
	getInventory,
	newInventory,
	updateInventory,
	deleteInventory,
	buySellUnit,
};
