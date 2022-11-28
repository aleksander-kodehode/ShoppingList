import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import findUser from "../api/routes/findUser";
import { LogoWrapper, RightNav } from "../styled/headerStyled";
import { User } from "../types/types";
import logo from "../assets/logo.jpg";
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
      <LogoWrapper className="logoWrapper">
        <Link to={`/app/user/${userId}`}>
          <img src={logo} alt="logo" />
        </Link>
      </LogoWrapper>
      <RightNav>
        <div>
          <Avatar size="large" icon={<UserOutlined />} />
          <h4>{user.userName}</h4>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </RightNav>
    </>
  );
};
export default Header;
