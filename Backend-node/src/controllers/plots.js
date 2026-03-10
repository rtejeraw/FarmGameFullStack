import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import {
	findPlots,
	findPlot,
	createPlot,
	editPlot,
	removePlot,
	plantUnitPlot,
	harvestUnitPlot,
} from "../services/plots.js";

const getPlots = async (req, res) => {
	try {
		const plots = await findPlots();
		res.status(StatusCodes.OK).json({ count: plots.length, plots });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const getPlot = async (req, res) => {
	try {
		const { id: plotId } = req.params;

		const plot = await findPlot(plotId);
		if (!plot) {
			throw new NotFoundError(`No plot with id ${plotId}`);
		}
		res.status(StatusCodes.OK).json({ plot });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const newPlot = async (req, res) => {
	try {
		const plot = await createPlot(req.body);

		res.status(StatusCodes.CREATED).json({ plot });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const updatePlot = async (req, res) => {
	try {
		const {
			params: { id: plotId },
			body: { plot },
		} = req;

		if (plot === "") {
			throw new BadRequestError("Plot field cannot be empty");
		}

		const updatedPlot = await editPlot(plotId, plot);
		if (!updatedPlot) {
			throw new NotFoundError(`No plot with id ${plotId}`);
		}
		res.status(StatusCodes.OK).json({ updatedPlot });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const deletePlot = async (req, res) => {
	try {
		const { id: plotId } = req.params;

		const plot = await removePlot(plotId);
		if (!plot) {
			throw new NotFoundError(`No plot with id ${plotId}`);
		}

		res.status(StatusCodes.OK).json({ msg: "The plot entry was deleted." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const plantUnit = async (req, res) => {
	try {
		const {
			params: { id: plotId },
			body: { unit: unitId },
		} = req;

		const plot = await plantUnitPlot(plotId, unitId);
		if (!plot) {
			throw new NotFoundError(`No plot with id ${plotId}`);
		}

		res.status(StatusCodes.OK).json({ msg: "The unit was planted." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

const harvestUnit = async (req, res) => {
	try {
		const {
			params: { id: plotId },
		} = req;

		const plot = await harvestUnitPlot(plotId);
		if (!plot) {
			throw new NotFoundError(`No plot with id ${plotId}`);
		}

		res.status(StatusCodes.OK).json({ msg: "The unit was harvested." });
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
	}
};

export {
	getPlots,
	newPlot,
	getPlot,
	updatePlot,
	deletePlot,
	plantUnit,
	harvestUnit,
};
