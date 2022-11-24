import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createList = async (req: Request, res: Response) => {
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
            name: "Fallback User",
          },
        },
      },
    },
  });
  res.json(createdList);
};
