import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const createList = async (userId: string, title: string) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.json();
};
export default createList;
