import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { ListItem, ShoppingListType } from "../types/types";

interface FuncProps {
  currentListItem: ListItem;
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
}: FuncProps) => {
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    handleItemDelete(currentListItem.itemId, currentListItem.item);
    setOpen(false);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="delete"
            type="primary"
            style={{ backgroundColor: "salmon" }}
            onClick={handleDelete}
          >
            Delete list
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          name="updateItem"
          initialValues={{ remember: true }}
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
        </Form>
      </Modal>
    </>
  );
};

export default ListItemModal;
