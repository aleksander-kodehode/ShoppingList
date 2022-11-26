import express from "express";
import { getShoppingLists } from "../controllers/listControllers/getListController";
import { createUser } from "../controllers/userControllers/createUserController";
import { createList } from "../controllers/listControllers/createNewListController";
import { deleteList } from "../controllers/listControllers/deleteListController";
import { findUser } from "../controllers/userControllers/findUserController";
import { getShoppingListsItems } from "../controllers/listItemControllers/getListItemsController";
import { createListItem } from "../controllers/listItemControllers/createListItemController";
import { deleteListItem } from "../controllers/listItemControllers/deleteListItemController";
import { login } from "../controllers/authControllers/loginController";
import register from "../controllers/authControllers/registerController";
import checkDuplicateUserName from "../middleware/verifyRegister";

const router = express.Router();

router.get("/user/:userId", findUser);
router.get("/user/:userId/list", getShoppingLists);
router.get("/user/:userId/:listId", getShoppingListsItems);
router.post("/user/:userId/:listId", createListItem);
router.delete("/user/:userId/:listId", deleteListItem);
router.post("/user/:userId", createList);
router.delete("/user/:userId", deleteList);
router.post("/register", createUser);

router.post("/auth/register", checkDuplicateUserName, register);
router.post("/auth/login", login);

export default router;
