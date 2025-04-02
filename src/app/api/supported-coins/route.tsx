import { NextResponse } from "next/server";

// Define types
interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
}

interface CleanCoin {
  id: string;
  symbol: string;
  name: string;
}

// Cache setup
const CACHE_TTL = 3600000; // 1 hour in milliseconds
let cachedCoins: CleanCoin[] = [];
let lastFetchTime = 0;

export async function GET() {
  try {
    // Return cached data if still valid
    const now = Date.now();
    if (now - lastFetchTime < CACHE_TTL && cachedCoins.length > 0) {
      return NextResponse.json(cachedCoins, {
        headers: {
          "Cache-Control": "public, max-age=3600",
          "X-Cache-Hit": "true",
        },
      });
    }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      // Handle rate limits specifically
      if (response.status === 429) {
        return NextResponse.json(
          {
            error: "API rate limit exceeded",
            cachedData: cachedCoins.length > 0 ? cachedCoins : null,
          },
          {
            status: 429,
            headers: {
              "Cache-Control": "public, max-age=60", // Short cache on error
            },
          }
        );
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const coins: CoinGeckoCoin[] = await response.json();

    const cleanCoins: CleanCoin[] = coins
      .map((coin: CoinGeckoCoin) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, " ")
          .trim(),
      }))
      .filter((coin: CleanCoin) => {
        return (
          coin.id &&
          coin.symbol &&
          coin.name &&
          coin.name.length >= 2 &&
          !/\p{Emoji}/u.test(coin.name) &&
          !/test|example|fake/i.test(coin.name)
        );
      })
      .sort((a, b) => a.symbol.localeCompare(b.symbol));

    // Update cache
    cachedCoins = cleanCoins;
    lastFetchTime = now;

    return NextResponse.json(cleanCoins, {
      headers: {
        "Cache-Control": "public, s-maxage=3600", // 1 hour
      },
    });
  } catch (error) {
    console.error("Coin fetch error:", error);

    // Return cached data if available
    if (cachedCoins.length > 0) {
      return NextResponse.json(cachedCoins, {
        headers: {
          "Cache-Control": "public, max-age=3600",
          "X-Cache-Fallback": "true",
        },
      });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch coins",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
