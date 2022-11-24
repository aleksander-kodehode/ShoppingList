import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const deleteList = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const listId = await req.body.listId;
    const deletedList = await prisma.shoppingList.delete({
      where: {
        shoppingListId: listId,
      },
    });
    console.log(`Shopping list ${listId} was deleted`);
    res.json({
      message: `Successfully deleted entry: ${"deleteList"}`,
    });
    //error handling
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(400).send("No available Shopping List with this id");
      }
    }
    throw e;
  }
};
