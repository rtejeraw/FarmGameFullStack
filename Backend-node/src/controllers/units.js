import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import {
	findUnits,
	findUnit,
	createUnit,
	editUnit,
	removeUnit,
} from "../services/units.js";

const getUnits = async (req, res) => {
	try {
		const filter = req.query?.type ? { type: req.query.type } : {};
		const units = await findUnits(filter);
		res.status(StatusCodes.OK).json({ count: units.length, units });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const getUnit = async (req, res) => {
	try {
		const { id: unitId } = req.params;

		const unit = await findUnit(unitId);
		if (!unit) {
			throw new NotFoundError(`No unit with id ${unitId}`);
		}
		res.status(StatusCodes.OK).json({ unit });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const newUnit = async (req, res) => {
	try {
		const unit = await createUnit(req.body);
		if (!unit) {
			throw new BadRequestError(`No unit created`);
		}

		res.status(StatusCodes.CREATED).json({ unit });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const updateUnit = async (req, res) => {
	try {
		const {
			params: { id: unitId },
			body: { unit },
		} = req;

		const updatedUnit = await editUnit(unitId, unit);
		if (!updatedUnit) {
			throw new NotFoundError(`No unit with id ${unitId}`);
		}
		res.status(StatusCodes.OK).json({ updatedUnit });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const deleteUnit = async (req, res) => {
	try {
		const { id: unitId } = req.params;

		const unit = await removeUnit(unitId);
		if (!unit) {
			throw new NotFoundError(`No unit with id ${unitId}`);
		}

		res.status(StatusCodes.OK).json({ msg: "The unit entry was deleted." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

export { getUnits, newUnit, getUnit, updateUnit, deleteUnit };
