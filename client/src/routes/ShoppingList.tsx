import React, { useEffect, useState } from "react";
import { ShoppingListType, ListItem } from "../types/types";
import "../App.css";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import getShoppingListItems from "../api/routes/shoppingListItems";
import createListItem from "../api/routes/createItem";
import deleteItem from "../api/routes/deleteItem";
import getShoppingList from "../api/routes/getShoppingLists";
import { Input, Button, Form, List, InputNumber } from "antd";

const ShoppingList: React.FC = () => {
  const { userId, listId } = useParams();
  const [itemTitle, setItemTitle] = useState("");
  const [listItems, setListItems] = useState([] as ListItem[]);
  const [lists, setLists] = useState([] as ShoppingListType[]);
  const [loading, setLoading] = useState(false);

  const handleCreateNewItem = async () => {
    // TODO:
    // Change fucntion to Update / Create
    // if item.name matches try to update amount in db and rerender state
    // else create the new item(need new controller in backend.)
    // Right now names are unique, which makes it so you cant create items with the same name
    // Want them to update instead of duplicating.
    if (!userId || !listId) return;
    const listItem = await createListItem(userId, listId, itemTitle).catch(
      (e) => {
        console.log(e.code);
      }
    );
    setListItems([...listItems, listItem]);
    setItemTitle("");
  };
  const handleCreateNewItemFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleItemDelete = async (itemId: number) => {
    console.log(itemId);
    if (!itemId || !userId || !listId)
      return console.log("Either listId, userId or sListId is undefined");
    const deletedList = await deleteItem(userId, listId, itemId);
    console.log(deletedList);
    setListItems(listItems.filter((item) => item.itemId !== itemId));
    //sort new list based on the deleted list.
  };
  useEffect(() => {
    if (!listId || !userId) return;
    (async () => {
      setLoading(true);
      const shoppingListsItems = await getShoppingListItems(userId, listId);
      setListItems(shoppingListsItems);
      const shoppingLists = await getShoppingList(userId);
      setLists(shoppingLists);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="shopping-list-view">
      <h1>
        {/* TODO: Need to remove this and add relation in the Prisma schema to avoid an extra fetch request */}
        {lists.length > 0 &&
          lists.map((list, idx) => {
            return list.shoppingListId === listId ? list.title : null;
          })}
      </h1>
      <BackButton />
      <Form
        name="create-new-item"
        initialValues={{ remember: true }}
        onFinish={handleCreateNewItem}
        style={{ width: "400px" }}
        onFinishFailed={handleCreateNewItemFailed}
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
      {/* Old form */}
      {/* <form onSubmit={handleCreateNewItem}>
        <label htmlFor="item-title">List name</label>
       
        <input
          id="item-title"
          value={itemTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setItemTitle(e.target.value);
          }}
        ></input>
        <button>Create new List</button>
      </form> */}

      {
        //Rendering list item from DB
        listItems.length > 0 ? (
          <List
            size="small"
            loading={loading}
            bordered
            dataSource={listItems}
            header={<div>Header info</div>}
            renderItem={(item) => (
              <List.Item>
                <div className="list-items">
                  <div className="list-item-title">
                    <span>{item.item}</span>
                    <span className="createdAt">{item.created_at}</span>
                  </div>
                  <InputNumber min={1} max={20} defaultValue={item.amount} />
                  <span>{item.isChecked}</span>
                  <Button onClick={(e: any) => handleItemDelete(item.itemId)}>
                    X
                  </Button>
                </div>
              </List.Item>
            )}
          ></List>
        ) : (
          <List size="small" bordered>
            <List.Item>Start adding items to get your own list</List.Item>
          </List>
        )
        // listItems.map((item, idx) => {
        //   return (
        //     <ul className="list-items" key={idx}>
        //       <li>
        //         {item.item}
        //         {item.amount}
        //         <p>
        //           {item.isChecked === false
        //             ? "This is unchecked"
        //             : "This is now checked"}
        //         </p>
        //         <p>{item.itemId}</p>
        //         {/* <span>{item.created_at}</span> */}
        //         {/* For some reason item.listId returns undefined */}
        //         <button onClick={(e: any) => handleItemDelete(item.itemId)}>
        //           X
        //         </button>
        //       </li>
        //     </ul>
        //   );
        // })
      }
    </div>
  );
};

export default ShoppingList;
