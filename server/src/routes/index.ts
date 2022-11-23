import express from "express";
import { getShoppingList } from "../controllers/getListController";
import { createUser } from "../controllers/createUserController";

const router = express.Router();

router.get("/lists", getShoppingList);
router.post("/register", createUser);

export default router;
