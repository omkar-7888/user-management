import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from "../services/user.service.js";
import { ApiError } from "../utils/api-error.js";

const parseId = (value: string): number => {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "Invalid user ID");
  }

  return id;
};

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const users = await getUsers();

  res.status(200).json({
    success: true,
    data: users
  });
};

export const getSingleUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseId(req.params.id);

  const user = await getUserById(id);

  res.status(200).json({
    success: true,
    data: user
  });
};

export const createNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = await createUser(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
};

export const updateExistingUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseId(req.params.id);

  const user = await updateUser(id, req.body);

  res.status(200).json({
    success: true,
    data: user
  });
};

export const deleteExistingUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseId(req.params.id);

  await deleteUser(id);

  res.status(204).send();
};