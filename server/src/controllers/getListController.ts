import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getShoppingLists = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    //Change to req.param.userID when routing is setup
    const creatorId = req.params.userId;
    // const userId = req.body.userID
    const ShoppingLists = await prisma.shoppingList.findMany({
      where: {
        creatorId: creatorId,
      },
    });
    res.json(ShoppingLists);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).send("Could not find a user with this ID");
    }
    throw e;
  }
};
