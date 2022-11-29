import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const deleteItem = async (userId: string, listId: string, ListId: number) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/${listId}`, {
    method: "DELETE",
    body: JSON.stringify({
      itemId: ListId,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};

export default deleteItem;
