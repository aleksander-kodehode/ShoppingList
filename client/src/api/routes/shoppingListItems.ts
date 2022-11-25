import { ListItem } from "../../types/types";
import apiConfig from "../config";

const getShoppingListItems = async (
  userId: String,
  listId: String
): Promise<ListItem[]> => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/${listId}`);
  return res.json();
};

export default getShoppingListItems;
