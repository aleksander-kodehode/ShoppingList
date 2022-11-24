import React, { useEffect, useState } from "react";
import { ListItem } from "../types/types";
import "../App.css";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import getShoppingListItems from "../api/routes/shoppingListItems";
import createListItem from "../api/routes/createItem";
import deleteItem from "../api/routes/deleteItem";

function ShoppingList() {
  const { userId, listId: sListId } = useParams();
  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);

  const handleCreateNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !sListId) return;
    const listItem = await createListItem(userId, sListId, itemTitle);
    setListItems([...listItems, listItem]);
    setItemTitle("");
  };
  const handleItemDelete = async (listId: number) => {
    console.log(listId);
    if (!listId || !userId || !sListId)
      return console.log("Either listId, userId or sListId is undefined");
    const deletedList = await deleteItem(userId, sListId, listId);
    console.log(deletedList);
    //sort new list based on the deleted list.
  };
  useEffect(() => {
    if (!sListId || !userId) return;
    (async () => {
      //Get listId using params from route
      //Grap all shopping list items related to shoppingListId
      //Display in a grid or in a UL
      const shoppingListsItems = await getShoppingListItems(userId, sListId);
      setListItems(shoppingListsItems);
    })();
  }, []);
  return (
    <div className="shopping-list-view">
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
      <h1>{`Hello this is a list view: ${"ds"}`}</h1>
      {listItems.length > 0 &&
        listItems.map((item, idx) => {
          return (
            <ul className="list-items" key={idx}>
              <li>
                {item.item}
                {/* <p>{item.listId}</p> */}
                {/* <span>{item.created_at}</span> */}
                {/* For some reason item.listId returns undefined */}
                <button onClick={(e: any) => handleItemDelete(item.listId)}>
                  delete
                </button>
              </li>
            </ul>
          );
        })}
    </div>
  );
}

export default ShoppingList;
