import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  province: text("province").notNull(),
  city: text("city").notNull(),
  availability: boolean("availability").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
