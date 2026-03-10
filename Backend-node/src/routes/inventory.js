import express from "express";
import {
	getInventory,
	newInventory,
	updateInventory,
	deleteInventory,
	buySellUnit,
	consumeUnit,
} from "../controllers/inventory.js";

const router = express.Router();

router.route("/").get(getInventory).post(newInventory);
router.route("/:id").patch(updateInventory).delete(deleteInventory);
router.route("/units/:id").post(buySellUnit).delete(consumeUnit);

export default router;
