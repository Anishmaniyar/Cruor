// db.js
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// 1. Setup the Neon Pool using the Pooled URL (port 6543)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Create the Adapter
const adapter = new PrismaNeon(pool);

// 3. Initialize Prisma with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
