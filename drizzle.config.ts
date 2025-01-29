import {defineConfig} from 'drizzle-kit';

console.log(process.env.DATABASE_URL);

export default defineConfig({
    schema: "./drizzle/schema",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: `${process.env.DATABASE_URL}`
    },
    verbose: true,
    strict: true
})