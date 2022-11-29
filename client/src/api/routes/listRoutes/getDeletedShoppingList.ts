import { authHeader } from "../../../services/authHeader";
import { ShoppingListType } from "../../../types/types";
import apiConfig from "../../config";

const getDeletedShoppingList = async (
  userId: String
): Promise<ShoppingListType[]> => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/recover`, {
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};

export default getDeletedShoppingList;
