// src/pages/api/bookings/index.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../drizzle/db";  // Assuming your Drizzle setup
import { bookings } from "../../../drizzle/schema/bookings";
import { and, eq } from "drizzle-orm";

// POST method for creating a booking
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 400 });
  }

  try {
    // Parse the request body
    const body = await req.json();
    const { providerId, serviceId, bookingDate, bookingTime, customerName, customerEmail, city } = body;

    // Validate required fields
    if (!providerId || !serviceId || !bookingDate || !bookingTime || !customerName || !customerEmail || !city) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if the booking already exists for the same date and time
    const existingBooking = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.providerId, providerId),
          eq(bookings.serviceId, serviceId),
          eq(bookings.bookingDate, new Date(bookingDate)), // Ensure correct date format
          eq(bookings.bookingTime, bookingTime)
        )
      )
      .limit(1);

    if (existingBooking.length > 0) {
      return NextResponse.json(
        { error: "Booking already exists for this time and service." },
        { status: 400 }
      );
    }

    // Insert new booking into the database
    const result = await db.insert(bookings).values({
      providerId,
      serviceId,
      bookingDate: new Date(bookingDate), // Convert to Date
      bookingTime,
      customerName,
      customerEmail,
      city,
    }).returning();

    return NextResponse.json(
      { message: "Booking created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create a booking." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
    try {
      const allBookings = await db
        .select()
        .from(bookings);
  
      if (!allBookings || allBookings.length === 0) {
        return NextResponse.json({ message: "No bookings found." }, { status: 404 });
      }
  
      return NextResponse.json({ bookings: allBookings }, { status: 200 });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
    }
  }
