import apiConfig from "../config";

const deleteItem = async (userId: string, sListId: string, listId: number) => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/${sListId}`, {
    method: "DELETE",
    body: JSON.stringify({
      itemId: listId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export default deleteItem;
