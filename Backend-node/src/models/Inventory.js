import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
		seeds: [
			{
				unit: {
					type: mongoose.Types.ObjectId,
					ref: "Unit",
					required: true,
				},
				amount: {
					type: Number,
					default: 0,
				},
			},
		],
		crops: [
			{
				unit: {
					type: mongoose.Types.ObjectId,
					ref: "Unit",
					required: true,
				},
				amount: {
					type: Number,
					default: 0,
				},
			},
		],
		breeds: [
			{
				unit: {
					type: mongoose.Types.ObjectId,
					ref: "Unit",
					required: true,
				},
				amount: {
					type: Number,
					default: 0,
				},
			},
		],
		animals: [
			{
				unit: {
					type: mongoose.Types.ObjectId,
					ref: "Unit",
					required: true,
				},
				amount: {
					type: Number,
					default: 0,
				},
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model("Inventory", inventorySchema);
