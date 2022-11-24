import { List } from "../../types/types";
import apiConfig from "../config";

const getShoppingList = async (userId: String): Promise<List[]> => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/list`);
  return res.json();
};

export default getShoppingList;
