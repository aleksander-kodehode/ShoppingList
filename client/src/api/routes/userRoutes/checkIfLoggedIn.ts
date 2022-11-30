import { authHeader } from "../../../services/authHeader";
import apiConfig from "../../config";

const checkLoggedIn = async () => {
  const token = authHeader();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const res = await fetch(`${apiConfig.server}/auth/check/${userId}`, {
    headers: { "Content-Type": "application/json", Authorization: token! },
  });
  return res.status;
};

export default checkLoggedIn;
