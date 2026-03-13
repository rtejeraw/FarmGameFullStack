import NotFoundError from "../errors/not-found.js";
import Plot from "../models/Plot.js";
import { findUser, editUser } from "./users.js";
import { findUnit, findUnitBy } from "./units.js";
import { editInventory, findInventory } from "./inventory.js";
import CustomAPIError from "../errors/custom-api.js";

export const findPlots = async (userId) => {
	return await Plot.find({
		user: userId,
	})
		.populate({ path: "unit", strictPopulate: false })
		.sort("createdAt");
};

export const createPlot = async (data) => {
	return await Plot.create(data);
};

export const findPlot = async (plotId) => {
	return await Plot.findOne({
		_id: plotId,
	}).populate({ path: "unit", strictPopulate: false });
};

export const editPlot = async (plotId, data) => {
	try {
		const plot = await Plot.findByIdAndUpdate(plotId, data, {
			new: true,
			runValidators: false,
		});

		return plot;
	} catch (err) {
		console.log(err.message);
	}
};

export const removePlot = async (plotId) => {
	return await Plot.findByIdAndDelete({ _id: plotId });
};

export const plantUnitPlot = async (plotId, unitId) => {
	const plot = await findPlot(plotId);
	if (!plot) throw new NotFoundError(`No plot with id ${plotId}`);

	const userId = plot.user;
	const user = await findUser(userId);
	if (!user) throw new NotFoundError(`No user with id ${userId}`);

	const unit = await findUnit(unitId);
	if (!unit) throw new NotFoundError(`No unit with id ${unitId}`);

	const inventory = await findInventory(userId);
	if (!inventory)
		throw new NotFoundError(`No inventory with userId ${userId}`);

	//Check costs
	const newEnergy = user.energy - unit.energyCost / 2;
	if (newEnergy < 0) throw new CustomAPIError("Not enough energy");

	switch (unit.type) {
		case "Seed":
			const seed = inventory.seeds.find(
				(item) => item.unit._id.toString() === unitId,
			);
			if (!seed || seed.amount <= 0)
				throw new CustomAPIError("Not enough seeds.");
			break;
		case "Breed":
			const breed = inventory.breeds.find(
				(item) => item.unit._id.toString() === unitId,
			);
			if (!breed || breed.amount <= 0)
				throw new CustomAPIError("Not enough breeds.");
			break;
	}

	//Decrease user energy
	editUser(userId, { energy: newEnergy });

	//Decrease user inventory
	editInventory(inventory._id, unitId, -1);

	//Update plot
	let newUnit;

	switch (unit.name) {
		case "Cabbage Seed":
			newUnit = await findUnitBy({ name: "Cabbage" });
			break;
		case "Carrot Seed":
			newUnit = await findUnitBy({ name: "Carrot" });
			break;
		case "Sheep Breed":
			newUnit = await findUnitBy({ name: "Sheep" });
			break;
		case "Cow Breed":
			newUnit = await findUnitBy({ name: "Cow" });
			break;
		default:
			break;
	}

	if (!newUnit) throw new NotFoundError("Unit not found.");

	return editPlot(plotId, { unit: newUnit._id });
};

export const harvestUnitPlot = async (plotId) => {
	const plot = await findPlot(plotId);
	if (!plot) throw new NotFoundError(`No plot with id ${plotId}`);

	const userId = plot.user;
	const user = await findUser(userId);
	if (!user) throw new NotFoundError(`No user with id ${userId}`);

	const unitId = plot.unit?._id;
	if (!unitId) throw new NotFoundError(`No unit with id ${unitId}`);

	const unit = await findUnit(unitId);
	if (!unit) throw new NotFoundError(`No unit with id ${unitId}`);

	const inventory = await findInventory(userId);
	if (!inventory)
		throw new NotFoundError(`No inventory with userId ${userId}`);

	//Check costs
	const newEnergy = user.energy - unit.energyCost / 2;
	if (newEnergy < 0) throw new CustomAPIError("Not enough energy");

	//Decrease user energy
	editUser(userId, { energy: newEnergy });

	//Increase user inventory
	editInventory(inventory._id, unitId, 1);

	//Update plot
	editPlot(plotId, { unit: null });
};
