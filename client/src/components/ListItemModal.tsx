import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { Icon } from "@iconify/react";
import { ListItem } from "../types/types";
import updateListItem from "../api/routes/itemRoutes/updateListItem";

interface FuncProps {
  currentListItem: ListItem;
  listId: string;
  //Not very typed... TODO: If time fix this typing........
  handleItemDelete: (itemId: number, itemTitle: string) => any;
  setListItems: (arg: any) => any;
  listItems: any;
}

const ListItemModal = ({
  currentListItem,
  handleItemDelete,
  setListItems,
  listItems,
  listId,
}: FuncProps) => {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(currentListItem.item);
  const [updatedAmount, setUpdatedAmount] = useState(
    currentListItem.amount as number
  );
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    handleItemDelete(currentListItem.itemId, currentListItem.item);
    setOpen(false);
  };

  const handleOk = async () => {
    const listItemId = currentListItem.itemId;
    const updatedListItem = await updateListItem(
      listId,
      updatedAmount,
      updatedName,
      listItemId
    );
    //map over old array, find right object and replace data with new data from fetch
    //Doing it this way to avoid listItems jumping all over the place
    const newState = listItems.map((obj) => {
      if (obj.itemId === updatedListItem.itemId) {
        return { ...obj, amount: updatedAmount, item: updatedName };
      } else return obj;
    });
    setListItems(newState);
    setUpdatedName(currentListItem.item);
    setOpen(false);
  };
  const currentNumber = (value: number) => {
    setUpdatedAmount(value);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        <Icon icon="material-symbols:edit-square-outline" />
      </Button>
      <Modal
        title="Title"
        centered={true}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="delete"
            type="primary"
            style={{ backgroundColor: "salmon" }}
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          name="updateItem"
          initialValues={{
            Title: currentListItem.item,
            Amount: currentListItem.amount,
          }}
          onFinish={handleOk}
        >
          <Form.Item name="Title" label="Change title">
            <Input
              value={updatedName}
              minLength={2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUpdatedName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item name="Amout" label="Change Change the amount">
            <InputNumber
              value={updatedAmount}
              max={9999}
              min={1}
              //@ts-ignore
              onChange={currentNumber}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListItemModal;
