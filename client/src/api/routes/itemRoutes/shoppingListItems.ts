import { authHeader } from "../../../services/authHeader";
import { ListItem } from "../../../types/types";
import apiConfig from "../../config";

const getShoppingListItems = async (
  userId: String,
  listId: String
): Promise<ListItem[]> => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/${listId}`, {
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};

export default getShoppingListItems;
