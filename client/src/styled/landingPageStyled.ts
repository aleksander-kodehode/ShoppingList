import styled from "styled-components";
import { Button, Form, Input } from "antd";
// Login and register form container
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(5, 5, 5, 0.1);
  width: 450px;
  height: 500px;
  padding: 0 2rem;
  box-shadow: 2.5px 0.9px 18.9px -7px rgba(0, 0, 0, 0.021),
    6.1px 2.1px 29.1px -7px rgba(0, 0, 0, 0.028),
    11.4px 3.9px 35.5px -7px rgba(0, 0, 0, 0.033),
    20.3px 6.9px 41.2px -7px rgba(0, 0, 0, 0.039),
    38px 13px 50px -7px rgba(0, 0, 0, 0.051),
    91px 31px 80px -7px rgba(0, 0, 0, 0.09);
`;

//Register form overrides
export const RegFormContainer = styled(FormContainer)`
  & button {
    margin-top: 30px;
  }
  & > button {
    position: absolute;
    top: -20px;
    left: 10px;
    border-color: #7d8dfe;
    display: flex;
    flex-direction: row;
    align-items: center;
    & svg {
      transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    &:hover {
      & svg {
        transform: translateX(-5px);
      }
    }
  }
`;
export const RegFormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
`;
export const RegFromInput = styled(Input)``;
