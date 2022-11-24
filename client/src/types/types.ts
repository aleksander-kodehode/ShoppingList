export type User = {
  name: String;
};
export type List = {
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
  listId: string;
};
