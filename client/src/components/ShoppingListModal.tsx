import { useState } from "react";
import { Button, Modal, Form, Input, ModalFuncProps } from "antd";
import { Icon } from "@iconify/react";
import { ListItem, ShoppingListType } from "../types/types";
import updateList from "../api/routes/listRoutes/updateList";

interface FuncProps {
  list: ShoppingListType;
  //Not very typed... TODO: If time fix this typing........
  handleDelete: (arg: any) => any;
  setLists: (arg: any) => any;
  lists: any;
}
const ShoppingListModal = ({
  list,
  handleDelete,
  setLists,
  lists,
}: FuncProps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleDeleteItem = () => {
    handleDelete(list.shoppingListId);
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    const listId = list.shoppingListId;
    const updatedListTitle = await updateList(updatedTitle, listId);
    //Update state object based on id
    const newState = lists.map((obj) => {
      //match id in state with response id
      if (obj.shoppingListId === updatedListTitle.shoppingListId) {
        return { ...obj, title: updatedTitle };
      } else return obj;
    });
    setLists(newState);
    setOpen(false);
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
        title={`Edit this list (${list.title})`}
        centered={true}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="delete"
            type="primary"
            style={{ backgroundColor: "salmon" }}
            onClick={handleDeleteItem}
          >
            Delete list
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          name="UpdateList"
          onFinish={handleOk}
          initialValues={{ remember: true }}
        >
          <Form.Item name="Title" label="Change title">
            <Input
              value={updatedTitle}
              minLength={2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUpdatedTitle(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ShoppingListModal;
