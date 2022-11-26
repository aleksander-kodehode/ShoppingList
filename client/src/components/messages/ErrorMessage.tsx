import { message } from "antd";

const errorMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openErrorMessage = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
      duration: 2,
    });
  };
  return {
    openErrorMessage,
    errorMessageModal: <>{contextHolder}</>,
  };
};

export default errorMessage;
