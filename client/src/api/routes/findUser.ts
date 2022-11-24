import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const findUser = async (tokenId: string) => {
  const response = await fetch(`${apiConfig.server}/user`, {
    method: "get",
    body: JSON.stringify({
      tokenId: tokenId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  // TODO: save token id to a localstorage

  return response.json();
};
export default findUser;
