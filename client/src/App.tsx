import React, { useEffect, useState } from "react";
import getShoppingList from "./api/routes/getShoppingLists";
import { ShoppingListType, User } from "./types/types";
import "./App.css";
import { List, Button } from "antd";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import createList from "./api/routes/createNewList";
import deleteList from "./api/routes/deleteList";
import { AppContainer, ListContainer, Lists } from "./styled/appStyled";
import successMessage from "./components/messages/SuccessMessage";

const App: React.FC = () => {
  const { userId } = useParams();
  const [listTitle, setListTitle] = useState("");
  const [lists, setLists] = useState([] as ShoppingListType[]);

  const { openSuccessMessage, successMessageModal } = successMessage();

  const handleCreateNewList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const list = await createList(userId, listTitle);
    openSuccessMessage("Shopping List has been created");
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
    <AppContainer className="App">
      {successMessageModal}
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
        {lists.length > 0 && (
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={lists}
            renderItem={(list) => (
              <List.Item>
                <div>
                  <Link to={`${list.shoppingListId}`}>
                    <h2>{list.title}</h2>
                  </Link>
                  <span>{list.created_at.replace(/[-]/g, "-")}</span>
                </div>
                <Button
                  onClick={(e: any) => handleListDelete(list.shoppingListId)}
                >
                  <Icon icon="ion:trash-outline" />
                </Button>
              </List.Item>
            )}
          />
        )}
      </ListContainer>
    </AppContainer>
  );
};

export default App;
