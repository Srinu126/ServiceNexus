import { eq } from "drizzle-orm";
import { db } from "../../../../drizzle/db";
import { services } from "../../../../drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id) {
    return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
  }

  try {
    const serviceId = parseInt(params.id, 10);

    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const service = await db
      .select()
      .from(services)
      .where(eq(services.id, serviceId))
      .limit(1);

    if (!service || service.length === 0) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service: service[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}
