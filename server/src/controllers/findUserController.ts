import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const findUser = async (req: Request, res: Response) => {
  await prisma.$connect();
  const tokenId = await req.body.userName;
  const user = await prisma.user.findUnique({
    where: {
      tokenId: tokenId,
    },
  });
  res.json(user);
  //   res.json({
  //     user: user,
  //   });
};
