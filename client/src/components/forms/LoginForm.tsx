import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import loginUser from "../../api/routes/loginUser";
import statusMessage from "../StatusMessage";
import { FormContainer } from "../../styled/landingPageStyled";
import { authHeader } from "../../services/authHeader";
import checkLoggedIn from "../../api/routes/checkIfLoggedIn";

const LoginForm = () => {
  const [handleName, setHandleName] = useState("");
  const [handlePassword, setHandlePassword] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const { openErrorMessage, statusMessageModal } = statusMessage();

  const handleUserSubmit = async (e: React.FormEvent) => {
    const user = await loginUser(handleName, handlePassword);
    console.log(user);
    if (user.code !== 200) return openErrorMessage(user.message);
    setHandleName("");
    setHandlePassword("");
    if (user.id) navigate(`/app/user/${user.id}`);
  };
  useEffect(() => {
    (async () => {
      const token = authHeader();
      if (token) {
        const status = await checkLoggedIn();
        if (status === 200) {
          const userId = JSON.parse(localStorage.getItem("userId")!);
          navigate(`/app/user/${userId}`);
        }
      } else return;
    })();
  }, []);
  return (
    <>
      {statusMessageModal}
      <FormContainer>
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleUserSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your Username!" },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
              value={handleName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setHandleName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              size="large"
              value={handlePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setHandlePassword(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Link to={"/register"}>Or register here!</Link>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginForm;
