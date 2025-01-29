
import dotenv from "dotenv";
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { Pool } from "pg";

dotenv.config();


export const client = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "srinu",
    database: "servicenexusone",
});

export const db = drizzle(client, {schema});