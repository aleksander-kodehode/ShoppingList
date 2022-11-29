import { useEffect, useState } from "react";
import {
  FrownOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { ShoppingListType } from "../types/types";
import { List, Button } from "antd";
import { useParams } from "react-router-dom";
import { AppContainer, ListContainer } from "../styled/appStyled";
import statusMessage from "../components/StatusMessage";
import getDeletedShoppingList from "../api/routes/listRoutes/getDeletedShoppingList";
import recoverList from "../api/routes/listRoutes/recoverList";

const Trash: React.FC = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([] as ShoppingListType[]);
  //Status pop ups
  const {
    openSuccessMessage,
    openErrorMessage,
    openWarningMessage,
    statusMessageModal,
  } = statusMessage();

  const handleRecovery = async (listId: string) => {
    if (!userId) return openErrorMessage("Could not find userId");
    const res = await recoverList(listId, userId);
    openSuccessMessage("List was recovered successfully!");
    console.log(res);

    //either fetch lists again, or edit the lists array and remove the object that returned
    //and set it as new state
    console.log("Tried to recover list;", listId);
  };

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const res = await getDeletedShoppingList(userId);
      setTimeout(() => {
        setLists(res);
        setLoading(false);
      }, 1000);
      // const currentUser = await findUser(tokenId);
      // setUser(currentUser);
    })();
  }, []);

  if (loading) {
    return (
      <AppContainer className="App">
        <LoadingOutlined style={{ fontSize: "80px" }} />;
      </AppContainer>
    );
  } else
    return (
      <AppContainer className="App">
        {statusMessageModal}
        <ListContainer>
          {lists.length > 0 ? (
            <List
              loading={loading}
              itemLayout="horizontal"
              size="small"
              dataSource={lists}
              renderItem={(list) => (
                <List.Item>
                  <FrownOutlined
                    style={{ fontSize: "24px", marginRight: "10px" }}
                  />
                  <div>
                    <h2>{list.title}</h2>
                  </div>
                  <Button
                    onClick={(e: any) => handleRecovery(list.shoppingListId)}
                  >
                    <UndoOutlined />
                  </Button>
                </List.Item>
              )}
            ></List>
          ) : (
            <List size="small" bordered>
              <List.Item>You dont seem to have any deleted lists</List.Item>
            </List>
          )}
        </ListContainer>
      </AppContainer>
    );
};

export default Trash;
