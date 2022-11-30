import { useEffect, useReducer, useState } from "react";
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
import { ThemeContext, ThemeProvider } from "styled-components";
import ThemeReducer from "../context/themeReducer";
import {
  IPlaceThemeProvider,
  PlaceThemeContext,
} from "../context/themeContext";
import dark from "../styled/theme/dark";
import GlobalStyle from "../globalStyles";

const Root: React.FC = () => {
  const [currentTheme, setNewTheme] = useReducer(ThemeReducer, []);
  const themeContextProviderValue: IPlaceThemeProvider = {
    currentTheme,
    setNewTheme,
  };
  if (Array.isArray(currentTheme) && !currentTheme.length) {
    setNewTheme(dark);
  }
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
    <PlaceThemeContext.Provider value={themeContextProviderValue}>
      <ThemeProvider theme={currentTheme.updatedTheme}>
        <GlobalStyle />
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <MainContainer>
          <Outlet />
        </MainContainer>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </ThemeProvider>
    </PlaceThemeContext.Provider>
  );
};
export default Root;
