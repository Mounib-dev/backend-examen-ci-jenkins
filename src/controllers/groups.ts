import { Request, Response } from "express";
import { Group } from "../models/groupModel";
import { User } from "../models/userModel";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, members } = req.body;
    const group = new Group({ name, members });
    await group.save();
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
};

export const getUsersWithoutGroup = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ group: { $exists: false } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// export const sendInvitation = async (req: Request, res: Response) => {
//   try {
//     const { groupId, userId } = req.body;

//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: "Group not found" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     group.invitations.push(user._id);
//     await group.save();

//     res.status(200).json({ message: "Invitation sent successfully", group });
//   } catch (error) {
//     res.status(500).json({ message: "Error sending invitation", error });
//   }
// };
