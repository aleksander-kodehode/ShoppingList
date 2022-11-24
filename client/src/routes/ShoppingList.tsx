import React, { useEffect, useState } from "react";
import getShoppingList from "../api/routes/getShoppingLists";
import { List, User } from "../types/types";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import createList from "../api/routes/createNewList";
import deleteList from "../api/routes/deleteList";
import BackButton from "../components/BackButton";

function ShoppingList() {
  const [tokenId, setTokenId] = useState(
    "80845de7-bc05-478c-8232-8a32fd5dd67b"
  );
  const { userId, id } = useParams();
  const [user, setUser] = useState({} as User);
  const [listTitle, setListTitle] = useState("");
  const [lists, SetLists] = useState([] as List[]);
  console.log(`This is the userId: ${userId}, and this is the listId: ${id}`);

  //   const hanleCreateNewList = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!userId) return;
  //     const list = await createList(userId, listTitle);
  //     SetLists([...lists, list]);
  //     setListTitle("");
  //   };
  //   const handleListDelete = async (listId: string) => {
  //     if (!listId) return;
  //     const deletedList = await deleteList(listId);
  //     console.log(deletedList);

  //     //sort new list based on the deleted list.
  //   };
  useEffect(() => {
    if (!userId) return;
    (async () => {
      // const currentUser = await findUser(tokenId);
      // setUser(currentUser);
      const shoppingLists = await getShoppingList(userId);
      SetLists(shoppingLists);
    })();
  }, []);
  return (
    <div className="shopping-list-view">
      <BackButton />
      <h1>{`Hello this is a list view: ${"ds"}`}</h1>
      {/* <form onSubmit={hanleCreateNewList}>
        <label htmlFor="list-title">List name</label>
        <input
          id="list-title"
          value={listTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setListTitle(e.target.value);
          }}
        ></input>
        <button>Create new List</button>
      </form> */}
    </div>
  );
}

export default ShoppingList;
