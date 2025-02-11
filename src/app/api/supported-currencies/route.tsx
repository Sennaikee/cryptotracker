import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.API_KEY!;
  const endpoint = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      }


    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
