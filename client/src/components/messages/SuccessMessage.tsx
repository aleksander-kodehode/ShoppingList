import { message } from "antd";

const successMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openSuccessMessage = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 2,
    });
  };
  return {
    openSuccessMessage,
    successMessageModal: <>{contextHolder}</>,
  };
};

export default successMessage;
