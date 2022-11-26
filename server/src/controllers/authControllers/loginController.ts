import prisma from "../../prisma/prismaClient";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authConfig } from "../../config/auth.config";

export const login = async (req: Request, res: Response) => {
  await prisma.$connect();
  const { username, password } = req.body;
  const createUser = await prisma.user
    .findUnique({
      where: {
        userName: username,
      },
    })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User was not found in our systems!" });
      }
      console.log("User found");
      const validPassword = bcrypt.compareSync(password, user.password);
      console.log(validPassword);
      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Wrong Password",
        });
      }
      jwt.sign({ id: user.id }, authConfig.jwt.secret, {
        expiresIn: 86400, //1 day
      });
      res.status(200).send({
        message: "Logged in successfully",
        id: user.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
