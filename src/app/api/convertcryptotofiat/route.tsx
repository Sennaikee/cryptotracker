import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Validate request
    const body = await request.json();
    const { from, to, amount, type } = body;

    if (!from || !to || amount === undefined || !type) {
      return NextResponse.json(
        { error: "Missing required fields: from, to, amount, or type" },
        { status: 400 }
      );
    }

    // Build the API URL based on conversion type
    let apiUrl: string;
    if (type === "asset-to-currency") {
      apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
    } else {
      apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${to}&vs_currencies=${from}`;
    }

    // Fetch conversion rate
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Get the conversion rate
    let rate: number | undefined;
    if (type === "asset-to-currency") {
      rate = data[from]?.[to.toLowerCase()];
    } else {
      rate = data[to]?.[from.toLowerCase()];
      if (rate) rate = 1 / rate; // Invert for currency-to-asset
    }

    if (!rate) {
      // Provide detailed error about which coin/currency failed
      const direction =
        type === "asset-to-currency" ? `${from} to ${to}` : `${to} to ${from}`;
      return NextResponse.json(
        {
          error: `Could not find conversion rate for ${direction}`,
          suggestion: "Verify the coin/currency symbols are correct",
          debug: {
            apiUrl,
            responseData: data,
          },
        },
        { status: 400 }
      );
    }

    // Calculate result
    const result = type === "asset-to-currency" ? amount * rate : amount / rate;

    return NextResponse.json({
      result: parseFloat(result.toFixed(6)),
      rate: parseFloat(rate.toFixed(6)),
      from,
      to,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      {
        error: "Conversion failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
