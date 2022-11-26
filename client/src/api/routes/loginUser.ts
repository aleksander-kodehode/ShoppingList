import RefAutoComplete from "antd/es/auto-complete";
import apiConfig from "../config";

const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${apiConfig.server}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.status !== 200) {
    const error = await res.json();
    return error;
  }
  const data = res.json();
  return data.then((result) => {
    return result;
  });
};
export default loginUser;
