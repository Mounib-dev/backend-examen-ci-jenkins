import { Request, Response } from "express";

import { Config } from "../models/configModel";

export const configController = async (req: Request, res: any) => {
  console.log(req.body);
  const { usersNumber, groupsNumber, lastGroup } = req.body;
  const newConfig = {
    usersNumber: usersNumber,
    groupsNumber: groupsNumber,
    lastMin: lastGroup === "Smaller" ? true : false,
    lastMax: lastGroup === "Bigger" ? true : false,
  };
  try {
    await Config.deleteMany();
    const createdConfig = await Config.create(newConfig);
    console.log(createdConfig);
    if (createdConfig) {
      return res.status(201).json({ message: "Application configured" });
    }
  } catch (error: any) {
    console.error(`[server]:🗄️  ${error}`);
    return res.status(500).json({
      message: "Sorry something went wrong, the registration failed.",
    });
  }
};
