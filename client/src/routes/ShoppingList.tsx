import React, { useEffect, useState } from "react";

import { ListItem } from "../types/types";
import "../App.css";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import getShoppingListItems from "../api/routes/shoppingListItems";
import createListItem from "../api/routes/createItem";

function ShoppingList() {
  const { userId, listId } = useParams();
  const [tokenId, setTokenId] = useState(
    "80845de7-bc05-478c-8232-8a32fd5dd67b"
  );
  console.log(`userId:${userId}, listId:${listId}`);

  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);

  const hanleCreateNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !listId) return;
    const listItem = await createListItem(listId, userId, itemTitle);
    setListItems([...listItems, listItem]);
    setItemTitle("");
  };
  //   const handleListDelete = async (listId: string) => {
  //     if (!listId) return;
  //     const deletedList = await deleteList(listId);
  //     console.log(deletedList);
  //     //sort new list based on the deleted list.
  //   };
  useEffect(() => {
    if (!listId || !userId) return;
    (async () => {
      //Get listId using params from route
      //Grap all shopping list items related to shoppingListId
      //Display in a grid or in a UL
      const shoppingListsItems = await getShoppingListItems(userId, listId);
      setListItems(shoppingListsItems);
    })();
  }, []);
  return (
    <div className="shopping-list-view">
      <BackButton />
      <form onSubmit={hanleCreateNewItem}>
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
            <div className="shopping-list" key={idx}>
              <h2>{item.item}</h2>
              {/* <span>{item.created_at}</span> */}
              {/* <button
                onClick={(e: any) => handleListDelete(list.shoppingListId)}
              >
                delete
              </button> */}
            </div>
          );
        })}
    </div>
  );
}

export default ShoppingList;
