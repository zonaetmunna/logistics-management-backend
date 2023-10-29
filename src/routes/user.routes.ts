import express, { Router } from 'express';
import { createUser, getUsers } from '../controller/User.controller';
const router: Router = express.Router();

router.route('/').get(getUsers).post(createUser);
// .post(userController.applyAsSupplier)

router.route('/:id');
// .get(productController.getProductById)

module.exports = router;
