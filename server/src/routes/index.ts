import express from "express";
import { getShoppingLists } from "../controllers/getListController";
import { createUser } from "../controllers/createUserController";
import { createList } from "../controllers/createNewList";
import { deleteList } from "../controllers/deleteList";

const router = express.Router();

router.get("/user/:userId", getShoppingLists);
router.post("/user/:userId", createList);
router.delete("/user/:userId", deleteList);
router.post("/register", createUser);

export default router;
