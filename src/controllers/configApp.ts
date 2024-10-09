import { Request, Response } from "express";

import { Config } from "../models/configModel";

export const configController = async (req: Request, res: any) => {
  console.log(req.body);
  const { usersNumber, groupsNumber, lastGroupOptions } = req.body;
  const newConfig = {
    usersNumber: usersNumber,
    groupsNumber: groupsNumber,
    lastMin: lastGroupOptions === "Smaller" ? true : false,
    lastMax: lastGroupOptions === "Bigger" ? true : false,
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

// Fonction pour récupérer la configuration de l'application
export const getConfig = async (req: Request, res: any) => {
  try {
    // On récupère la dernière configuration (findOne et trié par _id décroissant)
    const config = await Config.findOne().sort({ _id: -1 });

    if (config) {
      return res.status(200).json(config);
    } else {
      return res.status(404).json({ message: "No configuration found" });
    }
  } catch (error: any) {
    console.error(`[server]:🗄️  ${error}`);
    return res.status(500).json({
      message: "Sorry something went wrong, failed to fetch configuration.",
    });
  }
};
