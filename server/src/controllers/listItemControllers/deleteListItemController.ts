import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

export const deleteListItem = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const itemId = await req.body.itemId;
    const deletedList = await prisma.listData.delete({
      where: {
        itemId: itemId,
      },
    });
    console.log(`Shopping list item ${itemId} was deleted`);
    res.json({
      message: `Successfully deleted entry: ${itemId}`,
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
