CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider_id" serial NOT NULL,
	"service_id" serial NOT NULL,
	"booking_date" timestamp NOT NULL,
	"booking_time" varchar NOT NULL,
	"customer_name" varchar NOT NULL,
	"customer_email" varchar NOT NULL,
	"city" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_provider_id_service_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."service_providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;