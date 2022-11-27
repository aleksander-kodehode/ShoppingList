import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import { Icon } from "@iconify/react";

const BackBtn = styled(Button)`
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
`;

// About page
const BackButton = () => {
  // Use this hook to programmatically navigate to another page
  const navigate = useNavigate();

  // This function is used to navigate to the home page
  // It will be called when the button is clicked
  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackBtn onClick={goBack} className="back-button">
      <Icon icon="material-symbols:keyboard-double-arrow-left" />
      {/* &larr;  */}
      Go Back
    </BackBtn>
  );
};

export default BackButton;
