import styled from "styled-components";

export const MainContainer = styled.main``;

export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  & > form {
    width: 500px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 60%;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    width: 95%;
  }
  & div {
    width: 100%;
  }

  & ul {
    /* border: 1px solid rgba(5, 5, 5, 0.1); */
    width: 100%;
    /* border-radius: 10px; */
    & li {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      background: white;
      justify-content: flex-start;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(5, 5, 5, 0.1);
      transition: box-shadow cubic-bezier(0.175, 0.885, 0.32, 1.275) 360ms;
      &:hover {
        box-shadow: 2.5px 0.9px 18.9px -7px rgba(0, 0, 0, 0.021),
          6.1px 2.1px 29.1px -7px rgba(0, 0, 0, 0.028),
          11.4px 3.9px 35.5px -7px rgba(0, 0, 0, 0.033),
          20.3px 6.9px 41.2px -7px rgba(0, 0, 0, 0.039),
          38px 13px 50px -7px rgba(0, 0, 0, 0.051),
          91px 31px 80px -7px rgba(0, 0, 0, 0.09);
      }
      &:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      &:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-bottom: 0;
      }
    }
    & div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      & a h2 {
        margin: 0;
      }
    }
  }
`;

export const Lists = styled.div`
  border-radius: 5px;
  width: 100%;
  padding: 1rem;
  position: relative;
  border: 1px solid red;
  & button {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
