import express from "express";
import { getShoppingLists } from "../controllers/listControllers/getListController";
import { createList } from "../controllers/listControllers/createNewListController";
import { deleteList } from "../controllers/listControllers/deleteListController";
import { findUser } from "../controllers/userControllers/findUserController";
import { getShoppingListsItems } from "../controllers/listItemControllers/getListItemsController";
import { createListItem } from "../controllers/listItemControllers/createListItemController";
import { deleteListItem } from "../controllers/listItemControllers/deleteListItemController";
import { login } from "../controllers/authControllers/loginController";
import { register } from "../controllers/authControllers/registerController";
import checkDuplicateUserName from "../middleware/verifyRegister";
import { verifyToken } from "../middleware/authJwt";
import { checkUserLoggedIn } from "../controllers/authControllers/checkController";

const router = express.Router();

//App routes
router.get("/user/:userId", verifyToken, findUser);
router.get("/user/:userId/list", verifyToken, getShoppingLists);
router.get("/user/:userId/:listId", getShoppingListsItems);
router.post("/user/:userId/:listId", verifyToken, createListItem);
router.delete("/user/:userId/:listId", verifyToken, deleteListItem);
router.post("/user/:userId", createList);
router.delete("/user/:userId", deleteList);

//auth
router.post("/auth/register", checkDuplicateUserName, register);
router.post("/auth/login", login);
router.get("/auth/check/:userId", verifyToken, checkUserLoggedIn);

export default router;
