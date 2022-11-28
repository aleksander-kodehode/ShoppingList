import React, { useEffect, useState } from "react";
import { ShoppingListType, ListItem } from "../types/types";
import "../App.css";
import { useParams } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import getShoppingListItems from "../api/routes/shoppingListItems";
import createListItem from "../api/routes/createItem";
import deleteItem from "../api/routes/deleteItem";
import getShoppingList from "../api/routes/getShoppingLists";
import { Input, Button, Form, List, Checkbox } from "antd";
import ListItemModal from "../components/ListItemModal";
import statusMessage from "../components/StatusMessage";
import {
  ListItemsContainer,
  PageContainer,
} from "../styled/shoppingListStyled";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import handleListItemChecked from "../api/routes/handleListItemChecked";

const ShoppingList: React.FC = () => {
  const { userId, listId } = useParams();
  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);
  const [lists, setLists] = useState([] as ShoppingListType[]);
  const [loading, setLoading] = useState(false);

  //Status pop ups
  const {
    openSuccessMessage,
    openErrorMessage,
    openWarningMessage,
    statusMessageModal,
  } = statusMessage();

  const handleCreateNewItem = async () => {
    // TODO:
    // Change fucntion to Update / Create
    // if item.name matches try to update amount in db and rerender state
    // else create the new item(need new controller in backend.)
    // Right now names are unique, which makes it so you cant create items with the same name
    // Want them to update instead of duplicating.
    if (!userId || !listId) return;
    if (!itemTitle) return openErrorMessage("List needs at least 2 characters");
    let match: boolean = true;
    [...listItems].forEach(async (item) => {
      if (item.item === itemTitle) {
        match = false;
        return openWarningMessage(
          "Item allready in list, try changing the amount"
        );
        //TODO:
        //send a createOrUpdate request with id, title, amount.
      }
    });
    if (match) {
      const listItem = await createListItem(userId, listId, itemTitle);
      openSuccessMessage(`Added ${itemTitle} to the list`);
      setListItems(
        [listItem, ...listItems].sort(
          (a, b) => Number(a.isChecked) - Number(b.isChecked)
        )
      );
      setItemTitle("");
    }
  };
  const handleCreateNewItemFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChecked = async (e: CheckboxChangeEvent, itemId: number) => {
    if (!userId || !listId) return;
    const checkedValue = e.target.checked;
    const checkUncheck = await handleListItemChecked(
      userId,
      listId,
      checkedValue,
      itemId
    ).then((data: ListItem) => {
      [...listItems].forEach((item, idx) => {
        // if (listItems.includes(item)) {
        if (item.itemId === data.itemId) {
          item.isChecked = !item.isChecked;
          // console.log(item.isChecked);
        }
      });
      setListItems(
        [...listItems].sort((a, b) => Number(a.isChecked) - Number(b.isChecked))
      );
    });
    console.log("Under then", listItems);
    // setListItems(
    //   [...listItems].sort((a, b) => Number(a.isChecked) - Number(b.isChecked))
    // );
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
  return (
    <PageContainer className="shopping-list-view">
      {statusMessageModal}
      <div className="title-wrapper">
        <BackButton />
        <h1>
          {/* TODO: Need to remove this and add relation in the Prisma schema to avoid an extra fetch request */}
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
        style={{ width: "500px" }}
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
                <List.Item>
                  <div className="list-items">
                    <Checkbox
                      onChange={(e) => handleChecked(e, item.itemId)}
                      defaultChecked={item.isChecked}
                    />
                    <div className="list-item-title">
                      <span>{item.item}</span>
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
          <List size="small" bordered>
            <List.Item>Start adding items to get your own list</List.Item>
          </List>
        )
      }
    </PageContainer>
  );
};

export default ShoppingList;
