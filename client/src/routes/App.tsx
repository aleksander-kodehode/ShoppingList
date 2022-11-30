import React, { useEffect, useState } from "react";
import getShoppingList from "../api/routes/listRoutes/getShoppingLists";
import { ShoppingListType } from "../types/types";
import { List, Button, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import createList from "../api/routes/listRoutes/createNewList";
import { AppContainer, ListContainer } from "../styled/appStyled";
import statusMessage from "../components/StatusMessage";
import ShoppingListModal from "../components/ShoppingListModal";
import toggleSoftDelete from "../api/routes/listRoutes/toggleSoftDelete";
import noDataSvg from "../assets/undrawNoData.svg";

const App: React.FC = () => {
  const { userId } = useParams();
  const [listTitle, setListTitle] = useState("");
  const [lists, setLists] = useState([] as ShoppingListType[]);
  const [loading, setLoading] = useState(true);

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
      return openErrorMessage("List needs at least 2 characters");
    }
    const list = await createList(userId, listTitle);
    openSuccessMessage(`Shopping list ${listTitle} was created successfully!`);
    setLists([...lists, list]);
    setListTitle("");
  };

  const handleListDelete = async (listId: string) => {
    if (!listId || !userId)
      return console.log("Either listId or userId is undefined");
    openWarningMessage(`List was moved to trash`);
    const deletedList = await toggleSoftDelete(listId, userId, true);
    //sort new list based on the deleted list.
    setLists(lists.filter((list) => list.shoppingListId !== listId));
  };
  function formatDate(d: string) {
    const time = d.replace(/\D/g, "");
    const year = time.slice(0, 4);
    const month = time.slice(4, 6);
    const day = time.slice(6, 8);
    const timestamp = d.slice(11, 19);
    const output = `${timestamp} | ${day}-${month}-${year}`;
    return output;
  }
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const res = await getShoppingList(userId);
      setLists(res);
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return (
      <AppContainer className="Loading">
        <LoadingOutlined style={{ fontSize: "80px" }} />
      </AppContainer>
    );
  } else
    return (
      <AppContainer className="App">
        {statusMessageModal}
        {/* <Form */}
        <Form
          name="create-new-item"
          initialValues={{ remember: true }}
          onFinish={handleCreateNewList}
          className="FormNewItem"
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
                  <span className="icon-container">
                    <Icon
                      icon="material-symbols:format-list-numbered-rounded"
                      width="42"
                    />
                  </span>
                  <div>
                    <Link to={`${list.shoppingListId}`}>
                      <h2>{list.title}</h2>
                    </Link>
                    <span>{formatDate(list.created_at)}</span>
                  </div>
                  <ShoppingListModal
                    list={list}
                    lists={lists}
                    setLists={setLists}
                    handleDelete={handleListDelete}
                  />
                </List.Item>
              )}
            ></List>
          ) : (
            <List size="small">
              <div className="noDataAvailable">
                <h2>There are no lists, start creating!</h2>
                <img src={noDataSvg} alt="No lists available" width="60%" />
              </div>
            </List>
          )}
        </ListContainer>
      </AppContainer>
    );
};

export default App;
