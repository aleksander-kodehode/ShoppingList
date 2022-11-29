import {
  UserOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { User } from "../types/types";

interface FuncProps {
  user: User;
  handleLogout: (arg: any) => any;
}

const UserMenu = ({ user, handleLogout }) => {
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
    }
    console.log("clicked this button", e.key);
  };
  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={onClick}
      style={{ fontSize: "18px", borderBottom: "none" }}
    />
  );
};
export default UserMenu;
