import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from "express";
import { Prisma } from "../generated/prisma/client.js";
import { ApiError } from "../utils/api-error.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Application error:", error);

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({
        success: false,
        message: "Email already exists"
      });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};