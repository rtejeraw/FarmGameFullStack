import mongoose from "mongoose";

const plotSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
		unit: {
			type: mongoose.Types.ObjectId,
			ref: "Unit",
			default: null,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Plot", plotSchema);
