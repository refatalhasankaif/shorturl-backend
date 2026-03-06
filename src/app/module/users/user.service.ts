import { prisma } from "../../lib/prisma";

const getCurrentUser = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

const updateUser = async (
  userId: string,
  data: { name?: string; avatar?: string }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { id: userId },
  });
};

export const UserService = {
  getCurrentUser,
  updateUser,
  deleteUser,
};