import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

const verifyToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const [, token] = authHeader.split(" ");

  jwt.verify(token, authConfig.jwt.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized access",
      });
    }
    //Need to check here?
    // req.userId = decoded.id
  });
};
