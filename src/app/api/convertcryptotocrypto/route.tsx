import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.API_KEY;
    const body = await request.json();
    const { from, to, amount } = body;

    const endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${from}%2C${to}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=5&x_cg_demo_api_key=${apiKey}`;

    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const rateFrom = data[from]?.["usd"];
    const rateTo = data[to]?.["usd"];

    if (!rateFrom || !rateTo) {
      throw new Error("Could not find conversion rate");
    }

    const result = (Number.parseFloat(amount) * rateFrom) / rateTo;
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Conversion failed" },
      { status: 500 }
    );
  }
}
