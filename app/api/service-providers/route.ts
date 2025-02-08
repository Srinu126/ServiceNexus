/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "../../../drizzle/db";
import { serviceProviders } from "../../../drizzle/schema/";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();
    const { name, email, phone, province, city, availability } = body;

    if (!name || !email || !province || !city) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    try {
      const provider = await db
        .insert(serviceProviders)
        .values({
          name,
          email,
          phone,
          province,
          city,
          availability: availability ?? true,
        })
        .returning();

      return NextResponse.json(
        { message: "Service provider added.", provider },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add service provider." },
        { status: 500 }
      );
    }
  }
}
