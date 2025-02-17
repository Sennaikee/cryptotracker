import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get request body
    const apiKey = process.env.API_KEY;
    const body = await request.json();
    const { id } = body;

    const endPoint = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true&x_cg_demo_api_key=${apiKey}`;

    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error fetching coin data",
      },
      { status: 500 }
    );
  }
}
