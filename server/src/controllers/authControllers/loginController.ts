import prisma from "../../prisma/prismaClient";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authConfig } from "../../config/auth.config";

export const login = async (req: Request, res: Response) => {
  await prisma.$connect();
  const { username, password } = req.body;
  const userLookup = await prisma.user
    .findUnique({
      where: {
        userName: username,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("User not in database");
        return res.status(404).send({
          accessToken: null,
          message: "Wrong username, or user doesn't exits",
          code: 404,
        });
      }
      console.log("User found");
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Wrong Password",
          code: 401,
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
        expiresIn: 86400, //1 day
      });

      return res.status(200).send({
        message: "Logged in successfully!",
        id: user.id,
        token: token,
        code: 200,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
