import express from "express";
import {
	getUnits,
	newUnit,
	getUnit,
	updateUnit,
	deleteUnit,
} from "../controllers/units.js";

const router = express.Router();

router.route("/").get(getUnits).post(newUnit);
router.route("/:id").get(getUnit).patch(updateUnit).delete(deleteUnit);

export default router;
