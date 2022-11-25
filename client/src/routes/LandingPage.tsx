import { useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../api/config";
import "../App.css";
import LoginForm from "../components/LoginForm";

const LandingPage: React.FC = () => {
  //Check for token
  const userId = "5c7b30ac-d177-4c4d-b2b0-4b9102bbcf6c";
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
      <LoginForm />
      <Link to={`/app/user/${userId}`}>Fake user login</Link>
    </div>
  );
};

export default LandingPage;
