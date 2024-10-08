import { Request, Response } from "express";

export const apiPortal = async (req: Request, res: Response) => {
  res.status(200).send("Welcome to the API Portal");
};
