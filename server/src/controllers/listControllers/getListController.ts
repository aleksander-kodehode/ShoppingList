import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const getShoppingLists = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const creatorId = req.params.userId;
    const ShoppingLists = await prisma.shoppingList.findMany({
      where: {
        creatorId: creatorId,
        deleted: false,
      },
    });
    res.json(ShoppingLists);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res
        .status(400)
        .send("Could not find a shopping list matching this ID");
    }
    throw e;
  }
};
