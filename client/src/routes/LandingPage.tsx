import apiConfig from "../api/config";
import LoginForm from "../components/forms/LoginForm";
import { FormWrapper } from "../styled/landingPageStyled";

const LandingPage: React.FC = () => {
  //check if user is logged in or not.
  if (localStorage.hasOwnProperty("token")) {
    const token = localStorage.getItem("token") || "";
    async () => {
      const response = fetch(`${apiConfig}/`);
    };
  }
  //Match token with a user, if user is found consider them logged in
  return (
    <>
      <h1>SHOPPING LIST APP</h1>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </>
  );
};

export default LandingPage;
