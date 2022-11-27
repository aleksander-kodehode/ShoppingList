import { authHeader } from "../../services/authHeader";
import apiConfig from "../config";

const updateList = async (title: string, listId: string) => {
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const token = authHeader();

  const res = await fetch(`${apiConfig.server}/user/${userId}/list`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      listId: listId,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};
export default updateList;
