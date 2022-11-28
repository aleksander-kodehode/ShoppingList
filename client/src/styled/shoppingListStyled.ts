import styled from "styled-components";
import { Input, Button, Form, List, InputNumber } from "antd";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .title-wrapper {
    display: flex;
    width: 70%;
    justify-content: center;
    position: relative;
    align-items: center;
    margin-bottom: 20px;
    & > button {
      position: absolute;
      left: 0;
    }
  }
`;

export const ListItemsContainer = styled.div`
  width: 70%;
  & div.ant-list-header {
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    & ul {
      width: 100%;
      display: grid;
      grid-template-columns: 0.4fr 2fr 0.7fr 0.2fr;
      grid-template-rows: 1fr;
      gap: 0px 10px;
      grid-auto-flow: row;
      grid-template-areas: ". . . .";
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
      font-weight: 700;
      & li.headerTitle {
        justify-self: flex-start;
      }
      &li {
      }
    }
  }
  & ul.ant-list-items {
    & li {
      & .list-items {
        width: 100%;
        display: grid;
        grid-template-columns: 0.4fr 2fr 0.7fr 0.2fr;
        grid-template-rows: 1fr;
        gap: 0px 10px;
        grid-auto-flow: row;
        grid-template-areas: ". . . .";
        & .ant-checkbox-wrapper {
          justify-self: center;
          align-self: center;
        }
        & .itemAmount {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        & .list-item-title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        & .createdAt {
          font-size: 10px;
          font-style: italic;
        }
      }
    }
  }

  & ul {
    background-color: white;
  }
  & ul:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
