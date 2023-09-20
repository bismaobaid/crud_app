import express from "express";
import {
  getUserController,
  postUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserController,
} from "../controllers/crudControllers.js";

const router = express.Router();
router.post("/create", postUserController); // to see all data

router.get("/view", getUserController); // to see all data of user
router.get("/view/:id", getUserByIdController); // to see specific data of user
router.put("/update/:id", updateUserByIdController); // update user by id
router.delete("/delete/:id", deleteUserController); // delete specific user by id

export default router;
