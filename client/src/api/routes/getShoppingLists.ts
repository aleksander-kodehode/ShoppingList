import { List } from "../../types/types";
import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const getShoppingList = async (userId: String): Promise<List[]> => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/list`);
  return res.json();
};

export default getShoppingList;
