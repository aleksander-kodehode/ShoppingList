import { Request, Response } from "express";

export const checkUserLoggedIn = async (req: Request, res: Response) => {
  //check if we get error from middleware
  if (!res.json()) {
    res.json({ message: "You are already logged in", code: 200 });
  }
  res.json();
};
