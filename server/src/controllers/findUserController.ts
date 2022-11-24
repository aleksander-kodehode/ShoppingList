import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const findUser = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const tokenId = await req.body.tokenId;
    const user = await prisma.user.findUnique({
      where: {
        tokenId: tokenId,
      },
    });
    res.json(user);
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
    }
    throw e;
  }
};
