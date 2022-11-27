import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const updateList = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const userId = req.params.userId;
    const { title, listId } = await req.body;
    const updatedList = await prisma.shoppingList.update({
      where: { shoppingListId: listId },
      data: {
        title: title,
      },
      //   data: {
      //     title: title,
      //     creator: {
      //       connectOrCreate: {
      //         where: {
      //           id: userId,
      //         },
      //         create: {
      //           //This will never be used, but is needed
      //           userName: "Fallback User",
      //           password: "fallback",
      //         },
      //       },
      //     },
      //   },
    });
    res.json(updatedList);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
    }
    throw e;
  }
};
