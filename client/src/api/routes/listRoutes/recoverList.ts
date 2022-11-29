import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const recoverList = async (listId: string, userId: string) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}/recover`, {
    method: "POST",
    body: JSON.stringify({
      listId: listId,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};
export default recoverList;
