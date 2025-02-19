import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Get request body
        const body = await request.json();
        const { coin, from, to } = body;
        const apiKey = process.env.API_KEY;

        // Fetch the chart data according to the time range
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${from}to=${to}&precision=3&x_cg_demo_api_key=${apiKey}`,
        );
        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch chart data" },
                { status: 500 },
            );
        }
        const prices = await response.json();

        // Extract the prices and timestamps


    }
    catch (error) {
        console.error("Chart data error:", error);
        return NextResponse.json({ error: "Chart data failed" }, { status: 500 });
    }
}