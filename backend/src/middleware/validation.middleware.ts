import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateBody =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      res.status(400).json({
        success: false,
        message
      });

      return;
    }

    req.body = result.data;
    next();
  };