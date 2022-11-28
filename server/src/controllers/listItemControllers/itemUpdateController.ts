import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const updateItem = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const { itemId } = req.params;
    const { amount, title } = await req.body;
    const itemIdInt = parseInt(itemId);

    const createdList = await prisma.listData.update({
      where: { itemId: itemIdInt },
      data: {
        amount: amount,
        item: title,
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
