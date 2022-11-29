import { useCallback, useEffect, useState } from "react";
import {
  FrownOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { ShoppingListType } from "../types/types";
import { List, Button } from "antd";
import { useParams } from "react-router-dom";
import { ListContainer } from "../styled/appStyled";
import statusMessage from "../components/StatusMessage";
import getDeletedShoppingList from "../api/routes/listRoutes/getDeletedShoppingList";
import recoverList from "../api/routes/listRoutes/recoverList";
import { TrashContainer } from "../styled/trashStyled";

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
    const res: ShoppingListType = await recoverList(listId, userId);
    console.log(res);
    getDeletedLists();
  };

  const getDeletedLists = useCallback(async () => {
    if (!userId) return;
    const res = await getDeletedShoppingList(userId);
    //Fake delay to showcase loading.
    setTimeout(() => {
      setLists(res);
      setLoading(false);
    }, 1000);
  }, [setLists]);

  useEffect(() => {
    getDeletedLists();
  }, [getDeletedLists]);

  if (loading) {
    return (
      <TrashContainer className="Trash">
        <LoadingOutlined style={{ fontSize: "80px" }} />;
      </TrashContainer>
    );
  } else
    return (
      <TrashContainer className="Trash">
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
      </TrashContainer>
    );
};

export default Trash;
