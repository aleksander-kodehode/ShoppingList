import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import crypto from "crypto";

export const createUser = async (req: Request, res: Response) => {
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
};
