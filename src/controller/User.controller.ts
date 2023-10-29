import { Request, Response } from 'express';
import {
	createUserService,
	getManagersService,
	getUserByIdService,
	getUsersService,
} from '../services/User.services';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await getUsersService();

		res.status(200).json({
			status: 'success',
			data: users,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: "Can't get the data",
			error: error.message,
		});
	}
};

export const getManagers = async (req: Request, res: Response) => {
	try {
		const managers = await getManagersService();

		res.status(200).json({
			status: 'success',
			data: managers,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: "Can't get the data",
			error: error.message,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const user = await createUserService(req.body);
		console.log(user);

		res.status(200).json({
			status: 'success',
			message: 'User created successfully!',
			data: user,
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: "Couldn't create user!",
			error: error.message,
		});
	}
};

export const makeStoreManager = async (req: Request, res: Response) => {
	try {
		const user = req.body;

		const userFound = await getUserByIdService(user._id);

		if (!userFound) {
			return res.status(404).json({
				status: 'fail',
				error: 'No user found for this id',
			});
		}

		// const result = await makeSotreManagerService(user._id);

		/* if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Failed to make manager",
            });
        } */

		res.status(200).json({
			status: 'success',
			message: 'Successfully made store manager',
		});
	} catch (error: any) {
		res.status(400).json({
			status: 'fail',
			message: 'Data is not inserted',
			error: error.message,
		});
	}
};
