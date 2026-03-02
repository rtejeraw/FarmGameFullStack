import express from "express";
import {
	getInventory,
	newInventory,
	updateInventory,
	deleteInventory,
	buySellUnit,
} from "../controllers/inventory.js";

const router = express.Router();

router.route("/").get(getInventory).post(newInventory);
router
	.route("/:id")
	.patch(updateInventory)
	.delete(deleteInventory)
	.post(buySellUnit);

export default router;
