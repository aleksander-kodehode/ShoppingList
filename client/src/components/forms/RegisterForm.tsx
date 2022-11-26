import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../../api/routes/createUser";
import { Button, Form, Input } from "antd";
import { RegFormContainer, RegFormItem } from "../../styled/landingPageStyled";
import BackButton from "../BackButton";
import statusMessage from "../StatusMessage";

const formItemLayout = {
  labelCol: {
    sm: { span: 10 },
  },
  wrapperCol: {
    sm: { span: 30 },
  },
};

const RegisterForm = () => {
  const { openErrorMessage, statusMessageModal } = statusMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [handleName, setHandleName] = useState("");
  const [handlePassword, setHandlePassword] = useState("");

  const handleUserSubmit = async (e: React.FormEvent) => {
    const user = await createUser(handleName, handlePassword);
    if (user.code !== 200) return openErrorMessage(user.message);
    setHandleName("");
    setHandlePassword("");
    console.log();
    navigate("/");
  };
  return (
    <RegFormContainer>
      {statusMessageModal}
      <BackButton />
      <h1>Register</h1>
      <Form
        {...formItemLayout}
        form={form}
        style={{ maxWidth: "400px" }}
        name="register"
        onFinish={handleUserSubmit}
      >
        <RegFormItem
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            value={handleName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHandleName(e.target.value);
            }}
          />
        </RegFormItem>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            value={handlePassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHandlePassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </RegFormContainer>
  );
};
export default RegisterForm;
