import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prismaClient";

interface MyToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const { userId } = req.params;
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const token = authHeader;

  jwt.verify(token, authConfig.jwt.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized access",
        code: 401,
      });
    }

    if (decoded) {
      // @ts-ignore
      if (decoded.id === userId) {
        //Edge case if database gets deleted and user doesn't exist it will still return true.
        //Need to connect to db to check if user exists
        await prisma.$connect();
        const confirmDb = await prisma.user
          .findUnique({
            where: {
              id: userId,
            },
          })
          .then((user) => {
            if (!user) {
              const responseNotExists = res.status(404).send({
                accessToken: null,
                message: "User doesn't exist!",
                code: 404,
              });
              next(responseNotExists);
            }
          });
        // console.log("Verified request");
        next();
      }
    }
  });
};
