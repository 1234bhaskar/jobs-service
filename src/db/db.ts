import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";

import * as schema from "./schema/index.js";

const { Pool } = pkg;

config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Check your environment configuration.");
}
const pool = new Pool({
    connectionString
});

export const db = drizzle(pool, { schema });
