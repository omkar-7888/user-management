import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_URL_TEST: z.string().min(1).optional(),
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(["development"]).default("development"),
  CORS_ORIGIN: z.string().url()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.issues);
  process.exit(1);
}

export const env = parsed.data;