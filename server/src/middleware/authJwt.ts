import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { NextFunction, Request, Response } from "express";

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

  console.log(token);

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
        //Check that user is the same as token.
        next();
      }
    }
  });
};
