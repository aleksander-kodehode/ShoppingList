import express, { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import crypto from "crypto";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  await prisma.$connect();

  const userId = await req.body.userName;
  const tokenId = crypto.randomUUID();

  const user = await prisma.user.create({
    data: {
      name: userId,
      tokenId: tokenId,
    },
  });
  if (!user) return res.status(400).send("Could not create user");
  res.json(`User ${userId} created with token: ${tokenId}`);
});

export default router;
