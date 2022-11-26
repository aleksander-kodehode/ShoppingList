import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../api/routes/createUser";
import loginUser from "../api/routes/loginUser";

const LoginForm = () => {
  const [handleName, setHandleName] = useState("");
  const [handlePassword, setHandlePassword] = useState("");
  const navigate = useNavigate();

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginUser(handleName, handlePassword);
    setHandleName("");
    setHandlePassword("");
    //Comeback to wrong password handling...
    if (!user) return console.log("Could not login");

    navigate(`/app/user/${user.id}`);
  };
  // localStorage.setItem("token", "a39a8f84-62e7-47bd-be61-a6e964cdcea6");
  return (
    <form className="loginForm" onSubmit={handleUserSubmit}>
      <label htmlFor="UserName">Please input a username</label>
      <input
        id="UserName"
        value={handleName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setHandleName(e.target.value);
        }}
      ></input>
      <label htmlFor="Password">Please input a password</label>
      <input
        id="Password"
        value={handlePassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setHandlePassword(e.target.value);
        }}
      ></input>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
