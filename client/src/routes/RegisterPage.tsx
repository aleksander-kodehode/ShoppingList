import RegisterForm from "../components/forms/RegisterForm";
import { FormWrapper } from "../styled/landingPageStyled";
import { Helmet } from "react-helmet";
const RegisterPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1>SHOPPING LIST APP</h1>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </>
  );
};

export default RegisterPage;
