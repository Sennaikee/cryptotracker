import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get request body
    const body = await request.json();
    const { from, to, amount } = body;

    // Fetch current prices for both currencies in USD
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from}%2C${to}&vs_currencies=usd&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch conversion rates" },
        { status: 500 }
      );
    }

    const prices = await response.json();

    // Calculate conversion
    // First get USD values for both currencies
    const fromUsdPrice = prices[from]?.usd;
    const toUsdPrice = prices[to]?.usd;

    if (!fromUsdPrice || !toUsdPrice) {
      return NextResponse.json(
        { error: "Invalid currency pair" },
        { status: 400 }
      );
    }

    // Calculate the conversion
    const result = (amount * fromUsdPrice) / toUsdPrice;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
