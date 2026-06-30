// prisma.config.ts
import "dotenv/config"; // 1. CRITICAL: This loads your .env variables before anything else runs
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  // 2. Explicitly map your schema path so the CLI knows where to look
  schema: "prisma/schema.prisma",

  // 3. Explicitly map where migrations are saved
  migrations: {
    path: "prisma/migrations",
  },

  // 4. Inject the Direct URL environment variable securely
  datasource: {
    url: env("DIRECT_URL"),
  },
});
