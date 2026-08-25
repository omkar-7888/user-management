import { Router } from "express";
import {
  createNewUser,
  deleteExistingUser,
  getAllUsers,
  getSingleUser,
  updateExistingUser
} from "../controllers/user.controller.js";
import { validateBody } from "../middleware/validation.middleware.js";
import {
  createUserSchema,
  updateUserSchema
} from "../validation/user.schema.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post(
  "/",
  validateBody(createUserSchema),
  createNewUser
);

router.put(
  "/:id",
  validateBody(updateUserSchema),
  updateExistingUser
);

router.delete("/:id", deleteExistingUser);

export default router;