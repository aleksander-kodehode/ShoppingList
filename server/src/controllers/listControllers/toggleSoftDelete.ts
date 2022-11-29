import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const toggleSoftDelete = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { listId, toggleDeleted } = await req.body;
    const updatedList = await prisma.shoppingList.update({
      where: { shoppingListId: listId },
      data: {
        deleted: toggleDeleted,
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
