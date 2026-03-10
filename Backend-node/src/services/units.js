import Unit from "../models/Unit.js";

export const findUnits = async (filter) => {
	return await Unit.find(filter).sort("createdAt");
};

export const createUnit = async (data) => {
	return await Unit.create(data);
};

export const findUnit = async (unitId) => {
	return await Unit.findOne({
		_id: unitId,
	});
};

export const findUnitBy = async (data) => {
	return await Unit.findOne(data);
};

export const editUnit = async (unitId, data) => {
	return await Unit.findByIdAndUpdate({ _id: unitId }, data, {
		new: true,
		runValidators: true,
	});
};

export const removeUnit = async (unitId) => {
	return await Unit.findByIdAndDelete({ _id: unitId });
};
