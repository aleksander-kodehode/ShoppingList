import apiConfig from "../config";

//Post to get token and id of user when he enter website
//--> GET user

const findUser = async (userId: string) => {
  const response = await fetch(`${apiConfig.server}/user/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
};
export default findUser;
