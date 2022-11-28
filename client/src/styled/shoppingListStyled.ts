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
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      &li {
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
