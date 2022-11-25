import React, { useEffect, useState } from "react";
import { List, ListItem } from "../types/types";
import "../App.css";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import getShoppingListItems from "../api/routes/shoppingListItems";
import createListItem from "../api/routes/createItem";
import deleteItem from "../api/routes/deleteItem";
import getShoppingList from "../api/routes/getShoppingLists";

function ShoppingList() {
  const { userId, listId } = useParams();
  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);
  const [lists, setLists] = useState([] as List[]);

  const handleCreateNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !listId) return;
    const listItem = await createListItem(userId, listId, itemTitle);
    setListItems([...listItems, listItem]);
    setItemTitle("");
  };
  const handleItemDelete = async (itemId: number) => {
    console.log(itemId);
    if (!itemId || !userId || !listId)
      return console.log("Either listId, userId or sListId is undefined");
    const deletedList = await deleteItem(userId, listId, itemId);
    console.log(deletedList);
    setListItems(listItems.filter((item) => item.itemId !== itemId));
    //sort new list based on the deleted list.
  };
  useEffect(() => {
    if (!listId || !userId) return;
    (async () => {
      const shoppingListsItems = await getShoppingListItems(userId, listId);
      setListItems(shoppingListsItems);
      const shoppingLists = await getShoppingList(userId);
      setLists(shoppingLists);
    })();
  }, []);
  return (
    <div className="shopping-list-view">
      <h1>
        {/* TODO: Need to remove this and add relation in the Prisma schema to avoid an extra fetch request */}
        {lists.length > 0 &&
          lists.map((list, idx) => {
            return list.shoppingListId === listId ? list.title : null;
          })}
      </h1>
      <BackButton />
      <form onSubmit={handleCreateNewItem}>
        <label htmlFor="item-title">List name</label>
        <input
          id="item-title"
          value={itemTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setItemTitle(e.target.value);
          }}
        ></input>
        <button>Create new List</button>
      </form>

      {listItems.length > 0 &&
        listItems.map((item, idx) => {
          return (
            <ul className="list-items" key={idx}>
              <li>
                {item.item}
                {item.amount}
                <p>
                  {item.isChecked === false
                    ? "This is unchecked"
                    : "This is now checked"}
                </p>
                <p>{item.itemId}</p>
                {/* <span>{item.created_at}</span> */}
                {/* For some reason item.listId returns undefined */}
                <button onClick={(e: any) => handleItemDelete(item.itemId)}>
                  X
                </button>
              </li>
            </ul>
          );
        })}
    </div>
  );
}

export default ShoppingList;
