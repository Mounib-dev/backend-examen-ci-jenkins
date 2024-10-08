import { Request, Response } from "express";

import { User } from "../models/userModel";

export const registerController = async (req: Request, res: any) => {
  interface newUser {
    firstname: string;
    lastname: string;
    birthDate: string;
    email: string;
    password: string;
    role: string;
  }
  console.log(req.body);
  if (req.body.password === req.body.confirmPassword) {
    const { firstname, lastname, birthDate, email, password, role }: newUser =
      req.body;
    const newUser: newUser = {
      firstname: firstname,
      lastname: lastname,
      birthDate: birthDate,
      email: email,
      password: password,
      role: role,
    };
    try {
      const createdUser = await User.create(newUser);
      console.log(createdUser);
      if (createdUser) {
        return res
          .status(201)
          .json({ message: "User created successefully, thank you." });
      }
    } catch (error: any) {
      console.error(`[server]:🗄️  ${error}`);
      if (error.code === 11000) {
        return res
          .status(409)
          .json({ message: "Email adress already in use." });
      }
      return res.status(500).json({
        message: "Sorry something went wrong, the registration failed.",
      });
    }
  }
  return res.status(400).json({ message: "The passwords must match." });
};
