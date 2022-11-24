import React, { useEffect, useState } from "react";
import getShoppingList from "./api/routes/getShoppingLists";
import { List, User } from "./types/types";
import "./App.css";
import LoginForm from "./components/LoginForm";
import findUser from "./api/routes/findUser";
import { useParams } from "react-router-dom";
import createList from "./api/routes/createNewList";

function App() {
  const [tokenId, setTokenId] = useState(
    "80845de7-bc05-478c-8232-8a32fd5dd67b"
  );
  const { userId } = useParams();
  const [user, setUser] = useState({} as User);
  const [listTitle, setListTitle] = useState("");
  const [lists, SetLists] = useState([] as List[]);

  const hanleCreateNewList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const list = await createList(userId, listTitle);
    SetLists([...lists, list]);
    setListTitle("");
  };
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
    <div className="App">
      <form onSubmit={hanleCreateNewList}>
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
      {lists.length > 0 &&
        lists.map((list, idx) => {
          return (
            <div className="shopping-list" key={idx}>
              <h2>{list.title}</h2>
              <span>{list.created_at}</span>
            </div>
          );
        })}
    </div>
  );
}

export default App;
