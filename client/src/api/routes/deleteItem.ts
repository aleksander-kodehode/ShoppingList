import apiConfig from "../config";

const deleteItem = async (userId: string, listId: string, ListId: number) => {
  const res = await fetch(`${apiConfig.server}/user/${userId}/${listId}`, {
    method: "DELETE",
    body: JSON.stringify({
      itemId: ListId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export default deleteItem;
