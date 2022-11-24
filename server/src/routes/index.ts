import express from "express";
import { getShoppingLists } from "../controllers/getListController";
import { createUser } from "../controllers/createUserController";
import { createList } from "../controllers/createNewList";
import { deleteList } from "../controllers/deleteList";
import { findUser } from "../controllers/findUserController";
import { getShoppingListsItems } from "../controllers/getListItemsController";
import { createListItem } from "../controllers/createListItemController";

const router = express.Router();

router.get("/user/:userId", findUser);
router.get("/user/:userId/list", getShoppingLists);
router.get("/user/:userId/:listId", getShoppingListsItems);
router.post("/user/:userId/:listId", createListItem);
router.post("/user/:userId", createList);
router.delete("/user/:userId", deleteList);
router.post("/register", createUser);

export default router;
