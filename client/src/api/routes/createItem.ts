import { authHeader } from "../../services/authHeader";
import apiConfig from "../config";

const createListItem = async (
  userId: string,
  listId: string,
  itemTitle: string
) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/${listId}`, {
    method: "POST",
    body: JSON.stringify({
      itemTitle: itemTitle,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};
export default createListItem;
