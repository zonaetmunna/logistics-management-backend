import express, { Express, Router } from "express";
const router: Router = express.Router();
import { createUser, getUsers } from "../controller/User.controller";


router.route("/").get(getUsers).post(createUser);
// .post(userController.applyAsSupplier)

router.route("/:id");
// .get(productController.getProductById)

module.exports = router;