import { NextResponse } from "next/server";

const DOCSBOT_TEAM_ID = process.env.DOCSBOT_TEAM_ID!;
const DOCSBOT_BOT_ID = process.env.DOCSBOT_BOT_ID!;

export async function POST(req: Request) {
  try {
    const { answerId, rating } = await req.json();

    const response = await fetch(
      `https://api.docsbot.ai/teams/${DOCSBOT_TEAM_ID}/bots/${DOCSBOT_BOT_ID}/rate/${answerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
