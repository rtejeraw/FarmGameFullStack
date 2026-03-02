import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide name"],
			maxlength: 20,
		},
		description: {
			type: String,
			maxlength: 100,
		},
		type: {
			type: String,
			required: [true, "Please provide type"],
			enum: ["Seed", "Crop", "Breed", "Animal"],
		},
		energyCost: {
			type: Number,
			required: [true, "Please provide energy cost"],
		},
		coinCost: {
			type: Number,
			required: [true, "Please provide coin cost"],
		},
		timeToGrow: {
			type: Number,
			required: [true, "Please provide time to grow"],
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Unit", unitSchema);
