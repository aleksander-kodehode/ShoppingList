import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import findUser from "../api/routes/findUser";
import { User } from "../types/types";

const Header = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      // const currentUser = await findUser(tokenId);
      // setUser(currentUser);
      const user = await findUser(userId);
      console.log(user);
      setUser(user);
    })();
  }, []);
  return (
    <>
      <h1>Header - Current user: {user.userName}</h1>
    </>
  );
};
export default Header;
