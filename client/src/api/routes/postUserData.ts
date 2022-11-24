import { User } from "../../types/types";
import apiConfig from "../config";

const createUser = async (userName: string) => {
  const res = await fetch(`${apiConfig.server}/register`, {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(res);
  // TODO: save token id to a localstorage

  return res.json();
};
export default createUser;
