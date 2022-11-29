import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const updateListItem = async (
  listId: string,
  amount: number,
  title: string,
  itemId: number
) => {
  const token = authHeader();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const res = await fetch(
    `${apiConfig.server}/user/${userId}/${listId}/${itemId}/update`,
    {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        title: title,
      }),
      headers: { "Content-Type": "application/json", Authorization: token! },
    }
  );
  return res.json();
};
export default updateListItem;
