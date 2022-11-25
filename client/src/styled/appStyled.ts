import styled from "styled-components";

export const MainContainer = styled.main``;

export const AppContainer = styled.div``;

export const ListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Lists = styled.div`
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  border: 1px solid red;
  & button {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
