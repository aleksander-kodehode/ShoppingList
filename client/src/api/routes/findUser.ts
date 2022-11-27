import { authHeader } from "../../services/authHeader";
import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const findUser = async (userId: string) => {
  const token: string = authHeader();
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  return res.json();
};
export default findUser;
