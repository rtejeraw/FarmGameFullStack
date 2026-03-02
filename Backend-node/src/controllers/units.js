import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getUnits = async (req, res) => {
	const units = await Unit.find().sort("createdAt");
	res.status(StatusCodes.OK).json({ count: units.length, units });
};

const getUnit = async (req, res) => {
	const { id: unitId } = req.params;

	const unit = await Unit.findOne({
		_id: unitId,
	});
	if (!unit) {
		throw new NotFoundError(`No unit with id ${unitId}`);
	}
	res.status(StatusCodes.OK).json({ unit });
};

const newUnit = async (req, res) => {
	const unit = await Unit.create(req.body);

	res.status(StatusCodes.CREATED).json({ unit });
};

const updateUnit = async (req, res) => {
	const {
		params: { id: unitId },
		body: { unit },
	} = req;

	if (unit === "") {
		throw new BadRequestError("Unit field cannot be empty");
	}

	const updatedUnit = await Unit.findByIdAndUpdate(
		{ _id: unitId },
		req.body,
		{ new: true, runValidators: true },
	);
	if (!updatedUnit) {
		throw new NotFoundError(`No unit with id ${unitId}`);
	}
	res.status(StatusCodes.OK).json({ updatedUnit });
};

const deleteUnit = async (req, res) => {
	const { id: unitId } = req.params;

	const unit = await Unit.findByIdAndDelete({ _id: unitId });
	if (!unit) {
		throw new NotFoundError(`No unit with id ${unitId}`);
	}

	res.status(StatusCodes.OK).json({ msg: "The unit entry was deleted." });
};

export { getUnits, newUnit, getUnit, updateUnit, deleteUnit };
