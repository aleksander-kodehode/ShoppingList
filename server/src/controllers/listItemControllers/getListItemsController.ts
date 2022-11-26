import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const getShoppingListsItems = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { listId } = req.params;
    const ShoppingListsItems = await prisma.listData.findMany({
      where: {
        shoppingListId: listId,
      },
    });
    res.json(ShoppingListsItems);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send("Could not find any items for this list");
    }
    throw e;
  }
};
