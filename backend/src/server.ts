import { env } from "./config/env.js";
import { app } from "./app.js";
import { prisma } from "./utils/prisma.js";

const server = app.listen(env.PORT, () => {
  console.log(
    `Backend server running at http://localhost:${env.PORT}`
  );
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Prisma disconnected.");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => {
  void gracefulShutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void gracefulShutdown("SIGINT");
});