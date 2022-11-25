import React, { useEffect, useState } from "react";
import getShoppingList from "./api/routes/getShoppingLists";
import { ShoppingListType, User } from "./types/types";
import "./App.css";
import { Form } from "antd";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import createList from "./api/routes/createNewList";
import deleteList from "./api/routes/deleteList";
import { ListContainer, Lists } from "./styled/appStyled";

const App: React.FC = () => {
  const [tokenId, setTokenId] = useState(
    "80845de7-bc05-478c-8232-8a32fd5dd67b"
  );
  const { userId } = useParams();
  const [listTitle, setListTitle] = useState("");
  const [lists, setLists] = useState([] as ShoppingListType[]);

  const handleCreateNewList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const list = await createList(userId, listTitle);
    setLists([...lists, list]);
    setListTitle("");
  };
  const handleListDelete = async (listId: string) => {
    console.log(listId);
    if (!listId || !userId)
      return console.log("Either listId or userId is undefined");
    const deletedList = await deleteList(userId, listId);
    //sort new list based on the deleted list.
    setLists(lists.filter((list) => list.shoppingListId !== listId));
  };
  useEffect(() => {
    if (!userId) return;
    (async () => {
      // const currentUser = await findUser(tokenId);
      // setUser(currentUser);
      const shoppingLists = await getShoppingList(userId);
      setLists(shoppingLists);
    })();
  }, []);
  return (
    <div className="App">
      {/* <Form */}
      <form onSubmit={handleCreateNewList}>
        <label htmlFor="list-title">List name</label>
        <input
          id="list-title"
          value={listTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setListTitle(e.target.value);
          }}
        ></input>
        <button>Create new List</button>
      </form>
      <ListContainer>
        {lists.length > 0 &&
          lists.map((list, idx) => {
            return (
              <Lists key={idx}>
                <Link to={`${list.shoppingListId}`}>
                  <h2>{list.title}</h2>
                </Link>
                <span>{list.created_at}</span>
                <button
                  onClick={(e: any) => handleListDelete(list.shoppingListId)}
                >
                  <Icon icon="iwwa:delete" />
                </button>
              </Lists>
            );
          })}
      </ListContainer>
    </div>
  );
};

export default App;
