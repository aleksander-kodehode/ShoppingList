import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const findUser = async (userId: string) => {
  const token = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    headers: { "Content-Type": "application/json", Authorization: token! },
  });

  return res.json();
};
export default findUser;
