import { NextResponse } from "next/server";

// Cache supported coins to avoid repeated API calls
let cachedSupportedCoins: { id: string; symbol: string; name: string }[] = [];
let lastCacheUpdate = 0;

export async function POST(request: Request) {
  try {
    // Validate request
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type. Please use application/json" },
        { status: 400 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { from, to, amount } = body;

    if (!from || !to || amount === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: from, to, or amount" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Refresh coin cache if stale (1 hour)
    const now = Date.now();
    if (now - lastCacheUpdate > 3600000 || cachedSupportedCoins.length === 0) {
      const coinsResponse = await fetch(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      cachedSupportedCoins = await coinsResponse.json();
      lastCacheUpdate = now;
    }

    // Validate coin IDs
    const fromCoin = cachedSupportedCoins.find(
      (coin) => coin.id === from.toLowerCase()
    );
    const toCoin = cachedSupportedCoins.find(
      (coin) => coin.id === to.toLowerCase()
    );

    if (!fromCoin || !toCoin) {
      const invalidCoins = [
        ...(!fromCoin ? [from] : []),
        ...(!toCoin ? [to] : []),
      ];

      return NextResponse.json(
        {
          error: `Unsupported coin(s): ${invalidCoins.join(", ")}`,
          suggestion: "Use exact CoinGecko IDs like 'bitcoin' or 'ethereum'",
        },
        { status: 400 }
      );
    }

    // Fetch prices with error handling
    const priceResponse = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from},${to}&vs_currencies=usd`,
      {
        next: { revalidate: 60 }, // Cache prices for 60 seconds
      }
    );

    if (!priceResponse.ok) {
      const errorData = await priceResponse.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Failed to fetch conversion rates",
          details: errorData.status?.error_message || priceResponse.statusText,
        },
        { status: priceResponse.status }
      );
    }

    const prices = await priceResponse.json();

    // Verify price data
    const fromUsdPrice = prices[from]?.usd;
    const toUsdPrice = prices[to]?.usd;

    if (!fromUsdPrice || !toUsdPrice) {
      return NextResponse.json(
        {
          error: "Missing price data",
          debug: {
            fromPriceAvailable: !!fromUsdPrice,
            toPriceAvailable: !!toUsdPrice,
            receivedData: prices,
          },
        },
        { status: 500 }
      );
    }

    // Calculate and return result
    const result = (amount * fromUsdPrice) / toUsdPrice;

    return NextResponse.json({
      result,
      metadata: {
        from: fromCoin.name,
        to: toCoin.name,
        rate: fromUsdPrice / toUsdPrice,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      {
        error: "Conversion failed",
        ...(error instanceof Error ? { details: error.message } : {}),
      },
      { status: 500 }
    );
  }
}
