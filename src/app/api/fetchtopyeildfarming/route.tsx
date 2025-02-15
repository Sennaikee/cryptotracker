import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.API_KEY;
  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=yield-farming&per_page=20&x_cg_demo_api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
