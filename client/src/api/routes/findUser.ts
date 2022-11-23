import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const createUser = async (tokenId: string) => {
  const response = await fetch(`${apiConfig.server}/user`, {
    method: "POST",
    body: JSON.stringify({
      tokenId: tokenId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  // TODO: save token id to a localstorage

  return response.json();
};
export default createUser;
