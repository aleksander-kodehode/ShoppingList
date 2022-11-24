import apiConfig from "../config";

const deleteList = async (userId: string, listId: string) => {
  const res = await fetch(`${apiConfig.server}/user/${userId}`, {
    method: "DELETE",
    body: JSON.stringify({
      listId: listId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export default deleteList;
