import { message } from "antd";

const warningMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openWarningMessage = (text: string) => {
    messageApi.open({
      type: "warning",
      content: text,
      duration: 2,
    });
  };
  return {
    openWarningMessage,
    warningMessageModal: <>{contextHolder}</>,
  };
};

export default warningMessage;
