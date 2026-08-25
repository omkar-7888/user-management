process.env.NODE_ENV = "development";

process.env.DATABASE_URL_TEST =
  process.env.DATABASE_URL_TEST ??
  "postgresql://postgres:root@localhost:5433/user_management_test";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:root@localhost:5433/user_management";

process.env.CORS_ORIGIN =
  process.env.CORS_ORIGIN ??
  "http://localhost:5173";

process.env.PORT = "5001";