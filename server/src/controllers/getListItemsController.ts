import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getShoppingListsItems = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    //Change to req.param.userID when routing is setup
    const listId = req.params.listId;
    const userId = req.params.userId;
    // const userId = req.body.userID
    const ShoppingListsItems = await prisma.listData.findMany({
      where: {
        shoppingListId: listId,
      },
    });
    //TODO: THIS RETURNS AN EMPTY OBJECT FOR SOME REASON
    console.log(ShoppingListsItems);
    res.json(ShoppingListsItems);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send("Could not find any items for this list");
    }
    throw e;
  }
};
