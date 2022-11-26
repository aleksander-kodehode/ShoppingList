import apiConfig from "../config";

const createUser = async (username: string, password: string) => {
  const res = await fetch(`${apiConfig.server}/auth/register`, {
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
export default createUser;
