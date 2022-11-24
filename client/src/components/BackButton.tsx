import { useNavigate } from "react-router-dom";

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
    <button onClick={goBack} className="back-button">
      &larr; Go Back
    </button>
  );
};

export default BackButton;