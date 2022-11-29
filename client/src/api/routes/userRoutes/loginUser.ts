import apiConfig from "../../config";

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
    //Save token and id to LocalStorage for auto login if they exist
    if (result.token) {
      localStorage.setItem("accessToken", JSON.stringify(result.token));
      localStorage.setItem("userId", JSON.stringify(result.id));
    }
    return result;
  });
};
export default loginUser;
