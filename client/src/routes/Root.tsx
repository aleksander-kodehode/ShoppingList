import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import checkLoggedIn from "../api/routes/userRoutes/checkIfLoggedIn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { authHeader } from "../services/authHeader";
import {
  FooterContainer,
  HeaderContainer,
  MainContainer,
} from "../styled/rootStyled";

const Root: React.FC = () => {
  const navigate = useNavigate();
  //Check logged in state
  useEffect(() => {
    (async () => {
      const token = authHeader();
      if (token) {
        const status = await checkLoggedIn();
        if (status === 200) {
          const userId = JSON.parse(localStorage.getItem("userId")!);
          navigate(`/app/user/${userId}`);
        }
      } else return navigate("/");
    })();
  }, []);

  return (
    <>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
};
export default Root;
