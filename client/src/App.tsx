import React, { useEffect, useState } from "react";
import getShoppingList from "./api/routes/getShoppingLists";
import { ShoppingListType, User } from "./types/types";
import "./App.css";
import { List, Button, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import createList from "./api/routes/createNewList";
import deleteList from "./api/routes/deleteList";
import { AppContainer, ListContainer, Lists } from "./styled/appStyled";
import statusMessage from "./components/StatusMessage";

const App: React.FC = () => {
  const { userId } = useParams();
  const [listTitle, setListTitle] = useState("");
  const [lists, setLists] = useState([] as ShoppingListType[]);
  //Status pop ups
  const {
    openSuccessMessage,
    openErrorMessage,
    openWarningMessage,
    statusMessageModal,
  } = statusMessage();

  const handleCreateNewList = async (e: React.FormEvent) => {
    if (!userId) return;
    if (!listTitle) {
      return openErrorMessage("List needs at least 3 characters");
    }
    const list = await createList(userId, listTitle);
    openSuccessMessage(`Shopping list ${listTitle} was created successfully!`);
    setLists([...lists, list]);
    setListTitle("");
  };
  const handleCreateNewListFailed = (errorInfo: any) => {
    openErrorMessage("Something went wrong");
    console.log("Failed:", errorInfo);
  };
  const handleListDelete = async (listId: string) => {
    console.log(listId);
    if (!listId || !userId)
      return console.log("Either listId or userId is undefined");
    const deletedList = await deleteList(userId, listId);
    //sort new list based on the deleted list.
    setLists(lists.filter((list) => list.shoppingListId !== listId));
    openWarningMessage(`Deleted list: ${deletedList.list.title}`);
  };
  useEffect(() => {
    if (!userId) return;
    (async () => {
      // const currentUser = await findUser(tokenId);
      // setUser(currentUser);
      const shoppingLists = await getShoppingList(userId);
      console.log(shoppingLists);
      setLists(shoppingLists);
    })();
  }, []);
  return (
    <AppContainer className="App">
      {statusMessageModal}
      {/* <Form */}
      <Form
        name="create-new-item"
        initialValues={{ remember: true }}
        onFinish={handleCreateNewList}
        style={{ width: "500px" }}
        onFinishFailed={handleCreateNewListFailed}
      >
        <Form.Item>
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 200px)" }}
              allowClear={true}
              size="large"
              value={listTitle}
              minLength={2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setListTitle(e.target.value);
              }}
              placeholder="List name"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Add List
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
      <ListContainer>
        {lists.length > 0 ? (
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={lists}
            renderItem={(list) => (
              <List.Item>
                <span>
                  <Icon
                    icon="material-symbols:format-list-numbered-rounded"
                    width="42"
                  />
                </span>
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
        ) : (
          <List size="small" bordered>
            <List.Item>Start adding items to get your own list</List.Item>
          </List>
        )}
      </ListContainer>
    </AppContainer>
  );
};

export default App;
