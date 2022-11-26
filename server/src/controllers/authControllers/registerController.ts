import prisma from "../../prisma/prismaClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  await prisma.$connect();
  const { username, password } = await req.body;
  const createUser = await prisma.user
    .create({
      data: {
        userName: username,
        password: bcrypt.hashSync(password, 8),
      },
    })
    .then(() => {
      return res.send({
        message: "User was created!",
        code: 200,
      });
    });
};
