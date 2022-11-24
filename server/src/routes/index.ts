import express from "express";
import { getShoppingLists } from "../controllers/getListController";
import { createUser } from "../controllers/createUserController";
import { createList } from "../controllers/createNewList";

const router = express.Router();

router.get("/user/:userId", getShoppingLists);
router.post("/user/:userId", createList);
router.post("/register", createUser);

export default router;
