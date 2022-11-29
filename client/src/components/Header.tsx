import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import findUser from "../api/routes/userRoutes/findUser";
import { LogoWrapper, RightNav } from "../styled/headerStyled";
import { User } from "../types/types";
import logo from "../assets/logo.jpg";
import UserMenu from "./UserMenu";

const Header = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();
  const localStorageUserId = JSON.parse(localStorage.getItem("userId")!);

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
      console.log(user);
    })();
  }, []);
  return (
    <>
      <LogoWrapper className="logoWrapper">
        <Link to={`/app/user/${localStorageUserId}`}>
          <img src={logo} alt="logo" />
        </Link>
      </LogoWrapper>
      <RightNav>
        <div>
          <UserMenu user={user} handleLogout={handleLogout} />
          {/* <Menu mode="horizontal" defaultSelectedKeys={["user"]}>
            <Menu.SubMenu key="Profile-Menu" title={user.userName}>
              <Menu.Item key="two" icon={<UserOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item key="trhee" icon={<DeleteOutlined />}>
                Trash
              </Menu.Item>
              <Menu.Item key="four" icon={<LoginOutlined />}>
                Logut
              </Menu.Item>
            </Menu.SubMenu>
          </Menu> */}
        </div>
      </RightNav>
    </>
  );
};
export default Header;
