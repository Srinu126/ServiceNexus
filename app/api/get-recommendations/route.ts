import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405, message: "Method Not Allowed" });
  }
  const body = await req.json();
  const { serviceType, location, budget, details } = body;

  const prompt = `
  User is looking for a "${serviceType}" service in "${location}" with a budget of "${budget || 'Not specified'}".
  Additional Details: ${details || "None"}.

  Provide exactly 3 recommendations in structured JSON format:
  [
    {
      "serviceProvider": "Provider Name",
      "service": "Service Offered",
      "cost": "Cost Estimate",
      "city": "City",
      "description": "Short Description"
    },
    ...
  ]
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama3-8b-8192",
      max_tokens: 400,
    });

    const recommendations = completion.choices[0].message.content;

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ message: "Failed to get recommendations" });
  }
}
