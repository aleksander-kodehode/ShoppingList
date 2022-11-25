import React from "react";
import { message } from "antd";

const successMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openSuccessMessage = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 1.5,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  return {
    openSuccessMessage,
    successMessageModal: <>{contextHolder}</>,
  };
};

export default successMessage;
