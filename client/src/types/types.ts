export type User = {
  name: String;
};
export type List = {
  title: string;
  listId: String;
  created_at: String;
  creatorId: String;
  listItems?: string[];
  shoppingListId: String;
};
