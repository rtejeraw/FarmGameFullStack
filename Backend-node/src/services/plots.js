import NotFoundError from "../errors/not-found.js";
import Plot from "../models/Plot.js";
import { findUser, editUser } from "./users.js";
import { findUnit, findUnitBy } from "./units.js";
import { editInventory, findInventory } from "./inventory.js";
import CustomAPIError from "../errors/custom-api.js";
import mongoose from "mongoose";

export const findPlots = async () => {
	return await Plot.find()
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
	const plot = await Plot.findOneAndUpdate(
		{
			_id: plotId,
		},
		data,
		{ new: true, runValidators: true },
	);

	return plot;
};

export const removePlot = async (plotId) => {
	return await Plot.findByIdAndDelete({ _id: plotId });
};

export const plantUnitPlot = async (plotId, unitId) => {
	const plot = await findPlot(plotId);
	if (!plot) throw NotFoundError(`No plot with id ${plotId}`);

	const userId = plot.user;
	const user = await findUser(userId);
	if (!user) throw NotFoundError(`No user with id ${userId}`);

	const unit = await findUnit(unitId);
	if (!unit) throw NotFoundError(`No unit with id ${unitId}`);

	const inventory = await findInventory(userId);
	if (!inventory) throw NotFoundError(`No inventory with userId ${userId}`);

	//Check costs
	const newEnergy = user.energy - unit.energyCost;
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
	return editPlot(plotId, { unit: unitId });
};

export const harvestUnitPlot = async (plotId) => {
	const plot = await findPlot(plotId);
	if (!plot) throw NotFoundError(`No plot with id ${plotId}`);

	const userId = plot.user;
	const user = await findUser(userId);
	if (!user) throw NotFoundError(`No user with id ${userId}`);

	const unitId = plot.unit;
	const unit = await findUnit(unitId);
	if (!unit) throw NotFoundError(`No unit with id ${unitId}`);

	const inventory = await findInventory(userId);
	if (!inventory) throw NotFoundError(`No inventory with userId ${userId}`);

	//Check costs
	const newEnergy = user.energy - unit.energyCost;
	if (newEnergy < 0) throw new CustomAPIError("Not enough energy");

	let addedUnitId = "";
	switch (unit.name) {
		case "Cabbage Seed":
			addedUnitId = (await findUnitBy({ name: "Cabbage Crop" }))._id;
			break;
		case "Carrot Seed":
			addedUnitId = (await findUnitBy({ name: "Carrot Crop" }))._id;
			break;
		case "Sheep Breed":
			addedUnitId = (await findUnitBy({ name: "Sheep" }))._id;
			break;
		case "Cow Breed":
			addedUnitId = (await findUnitBy({ name: "Cow" }))._id;
			break;
	}

	//Decrease user energy
	editUser(userId, { energy: newEnergy });

	//Increase user inventory
	editInventory(inventory._id, addedUnitId, 1);

	//Update plot
	return editPlot(plotId, { unit: null });
};
