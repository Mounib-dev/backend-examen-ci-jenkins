import { Request, Response, Router } from "express";

import bcrypt from "bcrypt";
import { User } from "../models/userModel";

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    return res.status(200).json({
      message: "Connexion réussie",
      userId: user._id,
      userRole: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};
