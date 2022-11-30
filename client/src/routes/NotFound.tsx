import styled from "styled-components";
import { AppContainer } from "../styled/appStyled";
import NotFound from "../assets/undraw404.svg";
import { Link, useNavigate } from "react-router-dom";

export const ErrorContainer = styled(AppContainer)`
  height: 100%;
  justify-content: center;
  align-items: center;
  & img {
    pointer-events: none;
    ::selection {
      color: transparent;
    }
  }
`;

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <h2>Could not find what you were looking for</h2>
      <Link to="/">Go back to login</Link>
      <img src={NotFound} draggable="false" alt="Error 404" />
    </ErrorContainer>
  );
};

export default ErrorPage;
