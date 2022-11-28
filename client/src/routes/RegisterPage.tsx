import RegisterForm from "../components/forms/RegisterForm";
import { FormWrapper } from "../styled/landingPageStyled";

const RegisterPage: React.FC = () => {
  return (
    <>
      <h1>SHOPPING LIST APP</h1>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </>
  );
};

export default RegisterPage;
