import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

export const createUser = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();

    const userId = await req.body.userName;
    const tokenId = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        name: userId,
        tokenId: tokenId,
      },
    });
    res.json({
      user: user,
    });
  } catch (e) {
    //Error handling
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
    }
    throw e;
  }
};
