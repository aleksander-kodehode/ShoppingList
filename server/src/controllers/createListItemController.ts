import { Prisma } from "@prisma/client";
import { create } from "domain";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createListItem = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { userId, listId } = req.params;
    const itemTitle = await req.body.itemTitle;
    const createdList = await prisma.listData.create({
      data: {
        item: itemTitle,
        // TODO: WHY THIS DOESNT WORK?
        shoppingListId: {
          connectOrCreate: {
            where: {
              shoppingListId: listId,
            },
            create: {
              shoppingListId: "random",
            },
          },
        },
        // title: itemTitle,
        // creator: {
        //   connectOrCreate: {
        //     where: {
        //       id: userId,
        //     },
        //     create: {
        //       name: "Fallback User",
        //     },
        //   },
        // },
      },
    });
    res.json(createdList);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
    }
    throw e;
  }
};
