import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { json } from "stream/consumers";
import prisma from "../prisma/prismaClient";

export const createListItem = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { listId } = req.params;
    const itemTitle = await req.body.itemTitle;
    // TODO: Update testing
    // const createdList = await prisma.listData.updateMany({
    //   where: { item: itemTitle },
    //   data: {
    //     amount: { increment: 1 },
    //   },
    // });
    const createdList = await prisma.listData.create({
      data: {
        item: itemTitle,
        ShoppingList: {
          connect: { shoppingListId: listId },
        },
      },
    });
    res.json(createdList);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(400)
          .send(
            "An operation failed because it depends on one or more records that were required but not found."
          );
      }
      if (e.code === "P2002") {
        return res.status(400).send("This item already exists");
      }
    }
    throw e;
  }
};
