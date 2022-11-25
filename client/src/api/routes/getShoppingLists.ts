import { ShoppingListType } from "../../types/types";
import apiConfig from "../config";

const getShoppingList = async (userId: String): Promise<ShoppingListType[]> => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/list`);
  return res.json();
};

export default getShoppingList;
