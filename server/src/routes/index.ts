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
import { updateList } from "../controllers/listControllers/updateList";
import { isChecked } from "../controllers/listItemControllers/itemIsCheckedController";
import { updateItem } from "../controllers/listItemControllers/itemUpdateController";
import { getDeletedShoppingLists } from "../controllers/listControllers/getDeletedLists";
import { toggleSoftDelete } from "../controllers/listControllers/toggleSoftDelete";

const router = express.Router();

//App routes
router.get("/user/:userId", verifyToken, findUser);
router.get("/user/:userId/list", verifyToken, getShoppingLists);
router.get("/user/:userId/recover", verifyToken, getDeletedShoppingLists);
router.post("/user/:userId/recover", verifyToken, toggleSoftDelete);
router.post("/user/:userId/list", verifyToken, updateList);
router.get("/user/:userId/:listId", verifyToken, getShoppingListsItems);
router.post("/user/:userId/:listId", verifyToken, createListItem);
router.delete("/user/:userId/:listId", verifyToken, deleteListItem);
router.post("/user/:userId/:listId/:itemId", verifyToken, isChecked);
router.post("/user/:userId/:listId/:itemId/update", verifyToken, updateItem);
router.post("/user/:userId", verifyToken, createList);
router.delete("/user/:userId", verifyToken, deleteList);

//auth
router.post("/auth/register", checkDuplicateUserName, register);
router.post("/auth/login", login);
router.get("/auth/check/:userId", verifyToken, checkUserLoggedIn);

export default router;
