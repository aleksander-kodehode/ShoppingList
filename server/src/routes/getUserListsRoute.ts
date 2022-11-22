import express, { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  await prisma.$connect();
  //Change to req.param.userID when routing is setup
  const userId = req.body.userID;
  const findShoppingLists = await prisma.shoppingList.findMany({
    where: {
      creatorId: userId,
    },
  });
  if (!findShoppingLists)
    return res.status(400).send("Could not find a user with this ID");
  res.json(findShoppingLists);
});

export default router;
