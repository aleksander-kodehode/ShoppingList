import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const recoverList = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { listId } = await req.body;
    const updatedList = await prisma.shoppingList.update({
      where: { shoppingListId: listId },
      data: {
        deleted: false,
      },
    });
    res.json(updatedList);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
    }
    throw e;
  }
};
