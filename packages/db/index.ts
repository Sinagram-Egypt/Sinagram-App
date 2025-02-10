import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schemas from "@repo/db/schema";

const pool = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(pool, { schema: schemas });
