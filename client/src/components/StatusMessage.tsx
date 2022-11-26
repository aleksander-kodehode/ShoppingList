import { message } from "antd";

const statusMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openSuccessMessage = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
      duration: 2,
    });
  };
  const openErrorMessage = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
      duration: 3,
    });
  };
  const openWarningMessage = (text: string) => {
    messageApi.open({
      type: "warning",
      content: text,
      duration: 2,
    });
  };

  return {
    openSuccessMessage,
    openErrorMessage,
    openWarningMessage,
    statusMessageModal: <>{contextHolder}</>,
  };
};

export default statusMessage;
