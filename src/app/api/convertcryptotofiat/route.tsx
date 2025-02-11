import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        // Get request body
        const body = await request.json()
        const { type, from, to, amount } = body
        console.log(type, from, to, amount)

        let endPoint = ''

        if ( type === 'asset-to-currency') {
            endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`
        } else {
            endPoint = `https://api.coingecko.com/api/v3/simple/price?ids=${to}&vs_currencies=${from}&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`
        }



        // Fetch current prices for both currencies in USD
        const response = await fetch(
            endPoint
        )
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch conversion rates' },
                { status: 500 }
            )
        }

        const data = await response.json()
        if (type === 'asset-to-currency') {
            const result = data[from]?.usd * amount
            return NextResponse.json({ result })
        } else {
            const result = amount / data[to]?.usd
            return NextResponse.json({ result })
        }
    } catch (error) {
        console.error('Conversion error:', error)
        return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
    }
}
