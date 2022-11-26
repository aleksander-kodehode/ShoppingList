import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const createList = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const userId = req.params.userId;
    const title = await req.body.title;
    const createdList = await prisma.shoppingList.create({
      data: {
        title: title,
        creator: {
          connectOrCreate: {
            where: {
              id: userId,
            },
            create: {
              //This will never be used, but is needed
              userName: "Fallback User",
              password: "fallback",
            },
          },
        },
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
