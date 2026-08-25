import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({
  connectionString
});

const prisma = new PrismaClient({
  adapter
});

const users = [
  {
    name: "Omkar Salunke",
    email: "omkar@example.com",
    age: 27,
    city: "Pune"
  },
  {
    name: "Rahul Patil",
    email: "rahul@example.com",
    age: 29,
    city: "Mumbai"
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    age: 26,
    city: "Nashik"
  }
];

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email
      },
      update: {
        name: user.name,
        age: user.age,
        city: user.city
      },
      create: user
    });
  }

  console.log("Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });