import { authHeader } from "../../services/authHeader";
import apiConfig from "../config";

const updateListItem = async (
  userId: string,
  listId: string,
  checkState: boolean,
  itemId: number
) => {
  const token = authHeader();
  const res = await fetch(
    `${apiConfig.server}/user/${userId}/${listId}/${itemId}`,
    {
      method: "POST",
      body: JSON.stringify({
        checked: checkState,
      }),
      headers: { "Content-Type": "application/json", Authorization: token! },
    }
  );
  return res.json();
};
export default updateListItem;
