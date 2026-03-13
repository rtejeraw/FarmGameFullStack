import Inventory from "../models/Inventory.js";
import { editUser, findUser } from "./users.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { findUnit } from "./units.js";

export const createInventory = async (userId) => {
	return await Inventory.create({ user: userId });
};

export const findInventory = async (userId) => {
	return await Inventory.findOne({
		user: userId,
	})
		.populate("seeds.unit")
		.populate("crops.unit")
		.populate("breeds.unit")
		.populate("animals.unit");
};

export const editInventory = async (inventoryId, unitId, amount) => {
	const inventory = await Inventory.findById(inventoryId);
	if (!inventory) {
		throw new NotFoundError("Inventary not found");
	}

	const unit = await findUnit(unitId);
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

	return inventory;
};

export const removeInventory = async (inventoryId) => {
	return await Inventory.findByIdAndDelete({ _id: inventoryId });
};

export const buySellInventory = async (inventoryId, unitId, amount) => {
	const inventory = await Inventory.findOne({
		_id: inventoryId,
	});

	const user = await findUser(inventory.user);
	if (!user) throw new NotFoundError(`No user with id ${inventory.user}`);

	const unit = await findUnit(unitId);
	if (!unit) throw new NotFoundError(`No unit with id ${unitId}`);

	const coinCost = unit.coinCost * amount;
	if (amount > 0 && user.coins < coinCost)
		throw new BadRequestError("You don't have enough coins.");

	user.coins -= coinCost;
	await user.save();

	return await editInventory(inventoryId, unitId, amount);
};

export const consumeInventory = async (inventoryId, unitId) => {
	const inventory = await Inventory.findOne({
		_id: inventoryId,
	});

	const unit = await findUnit(unitId);
	if (!unit) throw new NotFoundError(`No unit with id ${unitId}`);

	const user = await findUser(inventory.user);
	if (!user) throw new NotFoundError(`No user with id ${inventory.user}`);

	const newEnergy = user.energy + unit.energyCost;
	const editedUser = await editUser(inventory.user, { energy: newEnergy });
	if (!user) throw new NotFoundError(`No user with id ${editedUser._id}`);

	return await editInventory(inventoryId, unitId, -1);
};
