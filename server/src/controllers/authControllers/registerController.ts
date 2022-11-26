import prisma from "../../prisma/prismaClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = await req.body;

    await prisma.$connect();

    const createUser = await prisma.user.create({
      data: {
        userName: username,
        password: bcrypt.hashSync(password, 8),
      },
    });
    res.send({
      message: "User was created!",
    });
    // res.json({
    //   user: createUser,
    // });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export default register;
