import { pgTable, serial, text, numeric, timestamp, integer } from "drizzle-orm/pg-core";
import { serviceProviders } from "./service_providers";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id")
    .references(() => serviceProviders.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  mainKeywords: text("main_keywords"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
