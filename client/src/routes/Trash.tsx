import { useCallback, useEffect, useState } from "react";
import {
  FrownOutlined,
  UndoOutlined,
  DeleteOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { ShoppingListType } from "../types/types";
import { List, Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { ListContainer } from "../styled/appStyled";
import getDeletedShoppingList from "../api/routes/listRoutes/getDeletedShoppingList";
import toggleSoftDelete from "../api/routes/listRoutes/toggleSoftDelete";
import { TrashContainer } from "../styled/trashStyled";
import statusMessage from "../components/StatusMessage";
import voidSvg from "../assets/undrawVoid.svg";
import deleteList from "../api/routes/listRoutes/deleteList";

const { confirm } = Modal;

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

  const handleDeleteList = async (listId: string) => {
    //Handle perma delete with confirm.
    confirm({
      title: "Are you sure you want to delete this list permanently?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        if (!listId || !userId)
          return console.log("Either listId or userId is undefined");
        openWarningMessage(`List was permenantly deleted`);
        const deletedList = deleteList(userId, listId).then(() => {
          setLists(lists.filter((list) => list.shoppingListId !== listId));
          //sort new list based on the deleted list.
        });
      },
    });
  };

  const handleRecovery = async (listId: string) => {
    if (!userId) return openErrorMessage("Could not find userId");
    const res: ShoppingListType = await toggleSoftDelete(listId, userId, false);
    console.log(res);
    getDeletedLists();
    openSuccessMessage("List was moved back to Shopping Lists");
  };

  const getDeletedLists = useCallback(async () => {
    if (!userId) return;
    const res = await getDeletedShoppingList(userId);
    //Fake delay to showcase loading.
    setLists(res);
    setLoading(false);
  }, [setLists]);

  useEffect(() => {
    setTimeout(() => {
      getDeletedLists();
    }, 1000);
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
                    danger={true}
                    style={{ marginRight: "15px" }}
                    className="delete"
                    onClick={(e: any) => handleDeleteList(list.shoppingListId)}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Button
                    className="recover"
                    onClick={(e: any) => handleRecovery(list.shoppingListId)}
                  >
                    <UndoOutlined />
                  </Button>
                </List.Item>
              )}
            ></List>
          ) : (
            <TrashContainer className="Trash">
              <div className="noDataAvailable">
                <h2>Your trash is empty</h2>
                <img
                  src={voidSvg}
                  alt="Trash is empty"
                  width="60%"
                  style={{ marginRight: "90px" }}
                />
              </div>
            </TrashContainer>
          )}
        </ListContainer>
      </TrashContainer>
    );
};

export default Trash;
