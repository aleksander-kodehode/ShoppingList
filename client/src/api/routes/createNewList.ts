import { User } from "../../types/types";
import apiConfig from "../config";

const createList = async (userId: string, title: string) => {
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
export default createList;
