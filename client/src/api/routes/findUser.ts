import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const findUser = async (userId: string) => {
  const response = await fetch(`${apiConfig.server}/user/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  // TODO: save token id to a localstorage

  return response.json();
};
export default findUser;
