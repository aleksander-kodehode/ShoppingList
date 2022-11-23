import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getShoppingList = async (req: Request, res: Response) => {
  await prisma.$connect();
  //Change to req.param.userID when routing is setup
  const userId = req.params.userId;
  // const userId = req.body.userID
  const ShoppingLists = await prisma.shoppingList.findMany({
    where: {
      creatorId: userId,
    },
  });
  if (!ShoppingLists)
    return res.status(400).send("Could not find a user with this ID");
  res.json(ShoppingLists);
};
