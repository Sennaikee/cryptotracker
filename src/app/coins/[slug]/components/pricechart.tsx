"use client";

import { CoinDataProps } from "@/types/coindata";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PriceChartProps {
  coin: CoinDataProps;
  timeRange: string;
}

export default function PriceChart({ coin, timeRange }: Readonly<PriceChartProps>) {
    const sparklinePrices = coin.market_data.sparkline_7d.price;
    
    // Create timestamps for the last 7 days
    const sparklineTimestamps = Array.from({ length: sparklinePrices.length }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (sparklinePrices.length - i - 1));
      return date.toISOString().split('T')[0]; // Just get YYYY-MM-DD
    });
    
    // Extract latest price data from tickers
    const tickerData = coin.tickers.map(ticker => ({
      price: ticker.last,
      time: new Date(ticker.timestamp).toISOString().split('T')[0],
    }));
    
    // Combine the data for the chart
    const chartData = sparklinePrices.map((price, index) => ({
      date: sparklineTimestamps[index], // x-axis
      price: price, // y-axis
    }));
    
    // Format date for display
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    // Calculate price change percentage
    const firstPrice = sparklinePrices[0] || 0;
    const lastPrice = sparklinePrices[sparklinePrices.length - 1] || 0;
    const priceChange = lastPrice - firstPrice;
    const priceChangePercentage = firstPrice > 0 
      ? ((priceChange / firstPrice) * 100).toFixed(2) 
      : 0;
    const trending = priceChange >= 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle>{coin.name} Price Chart</CardTitle>
          <CardDescription>Last 7 Days Performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={Math.ceil(chartData.length / 6)}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={formatDate}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={trending ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          
        </CardFooter>
      </Card>
    );
}