import { Link } from "react-router-dom";
import "../App.css";
import BackButton from "../components/BackButton";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="login-form">
      <BackButton />
      <Link to={"/register"}>Register here for an account</Link>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
