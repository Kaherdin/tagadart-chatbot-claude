// app/api/ask/route.ts
import { NextResponse } from "next/server";

const DOCSBOT_TEAM_ID = process.env.DOCSBOT_TEAM_ID!;
const DOCSBOT_BOT_ID = process.env.DOCSBOT_BOT_ID!;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const response = await fetch(
      `https://api.docsbot.ai/teams/${DOCSBOT_TEAM_ID}/bots/${DOCSBOT_BOT_ID}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          full_source: false,
          format: "markdown",
          context_items: 5,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from DocsBot API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get answer" },
      { status: 500 }
    );
  }
}
