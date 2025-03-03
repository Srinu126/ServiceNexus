import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../drizzle/db";
import { services } from "../../../../drizzle/schema/";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: Promise<{ title: string }> }) {
  try {
    const { title } = await params;

    const formattedTitle = title.replace(/_/g, " ").trim().toLowerCase();

    const result = await db
      .select()
      .from(services)
      .where(eq(services.title, formattedTitle));

    if (result.length === 0) {
      return NextResponse.json({ message: "No services found" }, { status: 404 });
    }

    return NextResponse.json({ services: result });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
