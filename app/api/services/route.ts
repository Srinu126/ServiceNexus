import { and, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { services } from "../../../drizzle/schema/";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log(req, "req");
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, {status: 400});
  }

  try {
    const body = await req.json();
    const { providerId, title, description, category, mainKeywords, price } = body;

    if (!providerId || !title || !description || !category || !price) {
        return NextResponse.json(
            { error: "Missing required fields." },
            { status: 400 }
          );
    }

    const existingService = await db
  .select()
  .from(services)
  .where(
    and(
      eq(services.providerId, providerId),
      eq(services.title, title),
      eq(services.category, category)
    )
  )
  .limit(1);

  if (existingService.length > 0) {
    return NextResponse.json(
      { error: "Service already exists with the same providerId, title, and category." },
      { status: 400 }
    );
  }

    

    const result = await db.insert(services).values({
      providerId,
      title,
      description,
      category,
      mainKeywords,
      price,
    }).returning();

    return NextResponse.json({ message: "Service created successfully", result }, {status: 201});
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
        { error: "Failed to create a service." },
        { status: 500 }
      );
  }
}


export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 400 });
    }
  
    try {
      // Fetch all services with selected fields: category, title, price, and mainKeywords
      const serviceList = await db
        .select({
          id: services.id,
          category: services.category,
          title: services.title,
          price: services.price,
          mainKeywords: services.mainKeywords,
        })
        .from(services);
  
      if (!serviceList || serviceList.length === 0) {
        return NextResponse.json({ message: "No services found." }, { status: 404 });
      }
  
      return NextResponse.json({ services: serviceList }, { status: 200 });
    } catch (error) {
      console.error("Error fetching services:", error);
      return NextResponse.json({ error: "Failed to fetch services." }, { status: 500 });
    }
  }
  
