import { authHeader } from "../../services/authHeader";
import { ShoppingListType } from "../../types/types";
import apiConfig from "../config";

const getShoppingList = async (userId: String): Promise<ShoppingListType[]> => {
  const token: string = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/list`, {
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return res.json();
};

export default getShoppingList;
