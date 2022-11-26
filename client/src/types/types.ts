export type User = {
  id: string;
  userName: string;
};
export type ShoppingListType = {
  title: string;
  id: string;
  created_at: string;
  creatorId: string;
  listItems?: string[];
  shoppingListId: string;
};
export type ListItem = {
  item: string;
  created_at: string;
  itemId: number;
  isChecked: boolean;
  amount: number;
  shoppingListId: string;
};
