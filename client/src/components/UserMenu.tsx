import {
  UserOutlined,
  DeleteOutlined,
  SettingOutlined,
  LogoutOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/types";

interface FuncProps {
  user: User;
  handleLogout: (arg: any) => any;
}

const UserMenu = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const items = [
    {
      label: user.userName,
      key: "Menu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Profile",
          key: "user",
          icon: <UserOutlined />,
          disabled: true,
        },
        {
          label: "Shopping Lists",
          key: "lists",
          icon: <OrderedListOutlined />,
        },
        {
          label: "Settings",
          key: "settings",
          icon: <SettingOutlined />,
          disabled: true,
        },
        { label: "Trash", key: "trash", icon: <DeleteOutlined /> },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          danger: true,
        },
      ],
    },
  ];
  const onClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else if (e.key === "trash") {
      navigate(`/app/user/${userId}/recover`);
    } else if (e.key === "lists") {
      navigate(`/app/user/${userId}`);
    }
  };
  return (
    <Menu
      mode="horizontal"
      items={items}
      // triggerSubMenuAction="click"
      onClick={onClick}
      style={{ fontSize: "18px", borderBottom: "none" }}
    />
  );
};
export default UserMenu;
