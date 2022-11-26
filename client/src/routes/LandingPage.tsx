import { useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../api/config";
import "../App.css";
import LoginForm from "../components/LoginForm";

const LandingPage: React.FC = () => {
  if (localStorage.hasOwnProperty("token")) {
    const token = localStorage.getItem("token") || "";
    // console.log(`Token found: ${token}`);

    //check if user is logged in or not.
    async () => {
      const response = fetch(`${apiConfig}/`);
    };

    // const response =  fetch(`${apiConfig.server}/user`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       userName: userName,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   console.log(response);
    //   // TODO: save token id to a localstorage

    //   return response.json();
  } else {
    console.log("no token here");
  }
  //Match token with a user, if user is found consider them logged in
  return (
    <div className="login-form">
      <Link to={"/register"}>Register here for an account</Link>
      <LoginForm />
    </div>
  );
};

export default LandingPage;
