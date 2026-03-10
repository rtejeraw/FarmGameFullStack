import express from "express";
import {
	getPlots,
	newPlot,
	getPlot,
	updatePlot,
	deletePlot,
	plantUnit,
	harvestUnit,
} from "../controllers/plots.js";

const router = express.Router();

router.route("/").get(getPlots).post(newPlot);
router.route("/:id").get(getPlot).patch(updatePlot).delete(deletePlot);
router.route("/plant/:id").post(plantUnit).delete(harvestUnit);

export default router;
