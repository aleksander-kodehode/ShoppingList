import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
    const token = authHeader();
    if (!token) navigate("/");
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
