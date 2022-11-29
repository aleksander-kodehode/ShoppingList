import React, { useEffect, useState } from "react";
import { ShoppingListType, ListItem } from "../types/types";
import { useParams } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import getShoppingListItems from "../api/routes/itemRoutes/shoppingListItems";
import createListItem from "../api/routes/itemRoutes/createItem";
import deleteItem from "../api/routes/itemRoutes/deleteItem";
import getShoppingList from "../api/routes/listRoutes/getShoppingLists";
import { Input, Button, Form, List, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListItemModal from "../components/ListItemModal";
import statusMessage from "../components/StatusMessage";
import {
  ListItemsContainer,
  PageContainer,
} from "../styled/shoppingListStyled";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import handleListItemChecked from "../api/routes/itemRoutes/handleListItemChecked";
import noDataChorelist from "../assets/undrawChorelist.svg";

const ShoppingList: React.FC = () => {
  const { userId, listId } = useParams();
  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);
  const [lists, setLists] = useState([] as ShoppingListType[]);
  const [loading, setLoading] = useState(false);
  const [newArr, setNewArr] = useState();
  //Status pop ups
  const {
    openSuccessMessage,
    openErrorMessage,
    openWarningMessage,
    statusMessageModal,
  } = statusMessage();

  const handleCreateNewItem = async () => {
    if (!userId || !listId) return;
    if (!itemTitle) return openErrorMessage("List needs at least 2 characters");
    let match: boolean = true;
    //Check if item is already in the list
    [...listItems].forEach(async (item) => {
      if (item.item === itemTitle) {
        match = false;
        return openWarningMessage(
          "Item allready in list, try changing the amount"
        );
      }
    });
    if (match) {
      const listItem = await createListItem(userId, listId, itemTitle);
      openSuccessMessage(`Added ${itemTitle} to the list`);
      let newArr = Array.prototype.slice.call(listItems);
      newArr.push(listItem);
      newArr.sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
      setListItems(
        newArr
        // [listItem, ...listItems]
        // .sort(
        //   (a, b) => Number(a.isChecked) - Number(b.isChecked)
        // )
      );
      setItemTitle("");
    }
  };

  const handleChecked = async (e: CheckboxChangeEvent, itemId: number) => {
    if (!userId || !listId) return;
    let indexToDelete = 0;
    const checkedValue = e.target.checked;
    const checkUncheck: any = await handleListItemChecked(
      userId,
      listId,
      checkedValue,
      itemId
    );
    //Update state object based on id
    const newState = listItems.map((obj) => {
      //match id in state with response id
      if (obj.itemId === checkUncheck.itemId) {
        if (checkUncheck.isChecked) {
          return { ...obj, isChecked: true };
        } else return { ...obj, isChecked: false };
      } else return obj;
    });
    //TODO: Fix Visual bug with checkmark to sort the list on click
    setListItems(
      newState
      // .sort((a, b) => Number(a.isChecked) - Number(b.isChecked))
    );
  };
  const handleItemDelete = async (itemId: number, itemTitle: string) => {
    if (!itemId || !userId || !listId)
      return console.log("Either listId, userId or sListId is undefined");
    const deletedList = await deleteItem(userId, listId, itemId);
    openWarningMessage(`Delted ${itemTitle} from the list`);
    setListItems(listItems.filter((item) => item.itemId !== itemId));
    //sort new list based on the deleted list.
  };
  useEffect(() => {
    if (!listId || !userId) return;
    (async () => {
      setLoading(true);
      const shoppingListsItems = await getShoppingListItems(userId, listId);
      setListItems(
        shoppingListsItems.sort(
          (a, b) => Number(a.isChecked) - Number(b.isChecked)
        )
      );
      const shoppingLists = await getShoppingList(userId);
      setLists(shoppingLists);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <PageContainer className="Loading">
        <LoadingOutlined style={{ fontSize: "80px" }} />;
      </PageContainer>
    );
  } else
    return (
      <PageContainer className="shopping-list-view">
        {statusMessageModal}
        <div className="title-wrapper">
          <BackButton />
          <h1>
            {lists.length > 0 &&
              lists.map((list, idx) => {
                return list.shoppingListId === listId ? list.title : null;
              })}
          </h1>
        </div>
        <Form
          name="create-new-item"
          initialValues={{ remember: true }}
          onFinish={handleCreateNewItem}
          size="large"
        >
          <Form.Item>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 200px)" }}
                value={itemTitle}
                minLength={2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setItemTitle(e.target.value);
                }}
                placeholder="Item to remember"
              />
              <Button htmlType="submit" type="primary">
                Add
              </Button>
            </Input.Group>
          </Form.Item>
        </Form>
        {
          //Rendering list item from DB
          listItems.length > 0 ? (
            <ListItemsContainer id="ListItemsContainer">
              <List
                //rowKey="id"
                size="small"
                loading={loading}
                bordered
                dataSource={listItems}
                header={
                  <div>
                    <ul>
                      <li>Completed</li>
                      <li className="headerTitle">Title</li>
                      <li>Amount</li>
                      <li>Edit</li>
                      {/* <li>Delete</li> */}
                    </ul>
                  </div>
                }
                renderItem={(item) => (
                  <List.Item
                    className={item.isChecked ? "CheckmarkChecked" : ""}
                  >
                    <div className="list-items">
                      <Checkbox
                        onChange={(e) => handleChecked(e, item.itemId)}
                        defaultChecked={item.isChecked}
                      />
                      <div className="list-item-title-wrapper">
                        <h4 className="item-title">{item.item}</h4>
                        <span className="createdAt">{item.created_at}</span>
                      </div>
                      <span className="itemAmount">{item.amount}</span>
                      <ListItemModal
                        currentListItem={item}
                        // @ts-ignore
                        handleItemDelete={handleItemDelete}
                        setListItems={setListItems}
                        listItems={listItems}
                        listId={listId!}
                      />
                      {/* <Button
                      onClick={(e: any) =>
                        handleItemDelete(item.itemId, item.item)
                      }
                    >
                      X
                    </Button> */}
                    </div>
                  </List.Item>
                )}
              ></List>
            </ListItemsContainer>
          ) : (
            <List size="small">
              <div className="noDataAvailable">
                <h2>Nothing to remember here, start adding!</h2>
                <img
                  src={noDataChorelist}
                  alt="No lists avaialable"
                  width="60%"
                />
              </div>
            </List>
          )
        }
      </PageContainer>
    );
};

export default ShoppingList;
