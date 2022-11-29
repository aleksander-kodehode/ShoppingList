import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const toggleSoftDelete = async (
  listId: string,
  userId: string,
  toggleDeleted: boolean
) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/recover`, {
    method: "POST",
    body: JSON.stringify({
      listId: listId,
      toggleDeleted: toggleDeleted,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};
export default toggleSoftDelete;
