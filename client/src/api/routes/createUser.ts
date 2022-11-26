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
  // TODO: save token id to a localstorage

  return res.json();
};
export default createUser;
