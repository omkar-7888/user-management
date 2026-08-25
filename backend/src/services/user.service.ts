import { prisma } from "../utils/prisma.js";
import { ApiError } from "../utils/api-error.js";
import type { Prisma } from "../generated/prisma/client.js";

export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;

export const getUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      id: "asc"
    }
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const createUser = async (data: CreateUserInput) => {
  return prisma.user.create({
    data
  });
};

export const updateUser = async (
  id: number,
  data: UpdateUserInput
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  return prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = async (id: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  await prisma.user.delete({
    where: { id }
  });
};