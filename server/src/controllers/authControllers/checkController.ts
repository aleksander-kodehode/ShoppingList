import { Request, Response } from "express";

export const checkUserLoggedIn = async (req: Request, res: Response) => {
  res.json({ message: "You are already logged in", code: 200 });
};
