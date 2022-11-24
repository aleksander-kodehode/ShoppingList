import React, { useState } from "react";
import createUser from "../api/routes/postUserData";

const LoginForm = () => {
  const [handleName, setHandleName] = useState("");
  const [user, setUser] = useState("");
  // const navigate =

  //Use effect that checks if user is already logged in.

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await createUser(handleName);
    setHandleName("");
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
      <button>Start creating shopping lists</button>
    </form>
  );
};

export default LoginForm;
