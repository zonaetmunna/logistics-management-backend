import { Model } from "mongoose";
import User, { IUser } from "../model/User.model";

export const getUsersService = async () => {
    const users = await User.find({});
    return users;
};

export const getManagersService = async () => {
    const managers = await User.find({ role: "store-manager" });
    return managers;
};

export const createUserService = async (data: IUser) => {
    const newUser = await User.create(data);
    return newUser;
};

export const getUserByIdService = async (userId: string) => {
    const user = await User.findOne({ _id: userId });
    return user;
};

export const makeStoreManagerService = async (userId: string) => {
    const result = await User.updateOne({ _id: userId }, { role: "store-manager" });
    return result;
};