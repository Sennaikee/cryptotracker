import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get request body
    const apiKey = process.env.API_KEY;
    const body = await request.json();
    const { type, from, to, amount } = body;
    let endPoint = "";

    if (type === "asset-to-currency") {
      // For crypto to fiat, we need to use the lowercase currency code
      endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to.toLowerCase()}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2&x_cg_demo_api_key=${apiKey}`;
    } else {
      // For fiat to crypto, we need to use the lowercase currency code
      endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${to}&vs_currencies=${from.toLowerCase()}&x_cg_demo_api_key=${apiKey}`;
    }

    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (type === "asset-to-currency") {
      // Access the correct property using lowercase currency code
      const rate = data[from]?.[to.toLowerCase()];
      if (!rate) {
        throw new Error("Could not find conversion rate");
      }
      const result = rate * amount;
      return NextResponse.json({ result });
    } else {
      // Access the correct property using lowercase currency code
      const rate = data[to]?.[from.toLowerCase()];
      if (!rate) {
        throw new Error("Could not find conversion rate");
      }
      const result = amount / rate;
      console.log("result", result);
      return NextResponse.json({ result });
    }
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Conversion failed" },
      { status: 500 }
    );
  }
}
