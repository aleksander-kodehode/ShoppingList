import apiConfig from "../config";

const createUser = async (userName: string) => {
  const response = await fetch(`${apiConfig.server}/user`, {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  // TODO: save token id to a localstorage

  return response.json();
};
export default createUser;
