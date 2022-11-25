import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { ListItem } from "../types/types";

const ListItemModal: React.FC = ({ items }: any) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleDeleteItem = () => {
    console.log("test");
  };
  const handleDeleteFailed = () => {
    console.log("test");
  };
  const showModal = () => {
    setOpen(true);
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
      <Button type="primary" onClick={showModal}>
        <Icon icon="material-symbols:edit-square-outline" />
      </Button>
      <Modal
        title="Title"
        centered={true}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="create-new-item"
          initialValues={{ remember: true }}
          onFinish={handleDeleteItem}
          style={{ width: "400px" }}
          onFinishFailed={handleDeleteFailed}
        >
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 200px)" }}
              // value={itemTitle}
              minLength={2}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   setItemTitle(e.target.value);
              // }}
              defaultValue={items.item}
            />
            <Button htmlType="submit" type="primary">
              Add
            </Button>
          </Input.Group>
        </Form>
      </Modal>
    </>
  );
};

export default ListItemModal;
