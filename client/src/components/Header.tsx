import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import findUser from "../api/routes/findUser";
import { RightNav } from "../styled/headerStyled";
import { User } from "../types/types";

const Header = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const user = await findUser(userId);
      setUser(user);
    })();
  }, []);
  return (
    <>
      <div>logo here</div>
      <RightNav>
        <h4>profile: {user.userName}</h4>
        <button onClick={handleLogout}>Logout</button>
      </RightNav>
    </>
  );
};
export default Header;
