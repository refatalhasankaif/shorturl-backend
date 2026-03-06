import { Request, Response } from "express";
import { UserService } from "./user.service";

const getMe = async (req: Request, res: Response) => {
  const user = await UserService.getCurrentUser(req.user!.id);

  res.json({
    success: true,
    data: user,
  });
};

const updateMe = async (req: Request, res: Response) => {
  const { name, avatar } = req.body;

  const user = await UserService.updateUser(req.user!.id, {
    name,
    avatar,
  });

  res.json({
    success: true,
    data: user,
  });
};

const deleteMe = async (req: Request, res: Response) => {
  await UserService.deleteUser(req.user!.id);

  res.json({
    success: true,
    message: "User deleted",
  });
};

export const UserController = {
  getMe,
  updateMe,
  deleteMe,
};