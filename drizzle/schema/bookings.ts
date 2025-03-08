// src/drizzle/schema/bookings.ts
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { serviceProviders } from "./service_providers";
import { services } from "./services";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  providerId: serial("provider_id")
    .references(() => serviceProviders.id, { onDelete: "cascade" })
    .notNull(),
  serviceId: serial("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  bookingDate: timestamp("booking_date").notNull(),
  bookingTime: varchar("booking_time").notNull(),
  customerName: varchar("customer_name").notNull(),
  customerEmail: varchar("customer_email").notNull(),
  city: varchar("city").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
