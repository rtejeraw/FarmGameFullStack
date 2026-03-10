import User from "../models/User.js";

export const findUsers = async () => {
	return await User.find().sort("createdAt");
};

export const createUser = async (data) => {
	return await User.create(data);
};

export const findUser = async (userId) => {
	return await User.findOne({
		_id: userId,
	});
};

export const findUserBy = async (data) => {
	return await User.findOne(data);
};

export const editUser = async (userId, data) => {
	return await User.findByIdAndUpdate({ _id: userId }, data, {
		new: true,
		runValidators: true,
	});
};

export const removeUser = async (userId) => {
	return await User.findByIdAndDelete({ _id: userId });
};
