import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const deleteList = async (userId: string, listId: string) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    method: "DELETE",
    body: JSON.stringify({
      listId: listId,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};

export default deleteList;
