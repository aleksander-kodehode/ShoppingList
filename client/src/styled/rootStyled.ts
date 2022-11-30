import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  box-sizing: border-box;
  z-index: 1;
  justify-content: space-between;
  padding: 0 3rem;
  margin-bottom: 30px;
  box-shadow: -1px 8px 27px -7px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 8px 27px -7px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 8px 27px -7px rgba(0, 0, 0, 0.51);
`;

export const MainContainer = styled.main``;

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 3rem;
`;
