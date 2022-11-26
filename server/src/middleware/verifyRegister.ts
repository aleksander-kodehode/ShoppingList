import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prismaClient";

const checkDuplicateUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Mail
  await prisma.$connect();
  const userName = req.body.username;

  const duplicateUser = await prisma.user
    .findUnique({
      where: { userName: userName },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Username is already in use",
        });
      }
      next();
    });
};

export default checkDuplicateUserName;
