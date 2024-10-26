// app/api/ask/route.ts
import { NextResponse } from "next/server";

if (!process.env.DOCSBOT_TEAM_ID || !process.env.DOCSBOT_BOT_ID) {
  throw new Error("Missing DocsBot configuration in environment variables");
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Make sure we're using the correct URL and sending required parameters
    const response = await fetch(
      `https://api.docsbot.ai/teams/${process.env.DOCSBOT_TEAM_ID}/bots/${process.env.DOCSBOT_BOT_ID}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          metadata: {
            // Optional user metadata
            referrer: "website-assistant",
          },
          full_source: false,
          format: "markdown",
          context_items: 5,
        }),
      }
    );

    if (!response.ok) {
      console.error("DocsBot API Error:", await response.text());
      throw new Error(`DocsBot API error: ${response.status}`);
    }

    const data = await response.json();

    // Return standardized response format
    return NextResponse.json({
      answer: data.answer,
      sources: data.sources || [],
      id: data.id,
      couldAnswer: data.couldAnswer,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to get answer from DocsBot" },
      { status: 500 }
    );
  }
}
