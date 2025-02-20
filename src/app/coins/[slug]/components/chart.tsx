"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { UnixTimeRange } from "@/types/time";
import { useEffect, useState } from "react";
import {
  CoinChartMarketCap,
  CoinChartPrice,
  CoinChartVolume,
} from "@/types/coindata";

interface ChartProps {
  coinid: string;
  chartType: "price" | "marketcap" | "volume";
  timeRange: UnixTimeRange;
}

export default function Chart({
  coinid,
  chartType,
  timeRange,
}: Readonly<ChartProps>) {
  const [price, setPrice] = useState<CoinChartPrice[]>([]);
  const [volume, setVolume] = useState<CoinChartVolume[]>([]);
  const [marketcap, setMarketcap] = useState<CoinChartMarketCap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch("/api/fetchchartdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coin: coinid,
            from: timeRange.startTime,
            to: timeRange.endTime,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const data = await response.json();
        setPrice(data.prices || []);
        setVolume(data.volumes || []);
        setMarketcap(data.marketCaps || []);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [coinid, timeRange]);

  // Format date for display on x-axis
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Currency formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Get current data based on chart type
  const getCurrentData = () => {
    switch (chartType) {
      case "price":
        return price;
      case "marketcap":
        return marketcap;
      case "volume":
        return volume;
      default:
        return price;
    }
  };

  // Get appropriate dataKey based on chart type
  const getDataKey = () => {
    switch (chartType) {
      case "price":
        return "price";
      case "marketcap":
        return "marketcap";
      case "volume":
        return "volume";
      default:
        return "price";
    }
  };

  // Get chart title based on chart type
  const getChartTitle = () => {
    switch (chartType) {
      case "price":
        return "Price Chart";
      case "marketcap":
        return "Market Cap Chart";
      case "volume":
        return "Volume Chart";
      default:
        return "Price Chart";
    }
  };

  const chartConfig = {
    [chartType]: {
      label: chartType === "price" 
        ? "Price" 
        : chartType === "marketcap" 
          ? "Market Cap" 
          : "Volume",
      color: chartType === "price" 
        ? "hsl(var(--chart-1))" 
        : chartType === "marketcap" 
          ? "hsl(var(--chart-2))" 
          : "hsl(var(--chart-3))",
    }
  } satisfies ChartConfig;

  const currentData = getCurrentData();
  const dataKey = getDataKey();
  const chartColor = chartType === "price" 
    ? "hsl(var(--chart-1))" 
    : chartType === "marketcap" 
      ? "hsl(var(--chart-2))" 
      : "hsl(var(--chart-3))";

      const CoinName = coinid.charAt(0).toUpperCase() + coinid.slice(1);


  return (
    <Card>
      <CardHeader>
        <CardTitle>{coinid.toUpperCase()} {getChartTitle()}</CardTitle>
        <CardDescription>
          {CoinName} {chartType === "price" ? "Price" : chartType === "marketcap" ? "Market Cap" : "Volume"} history in USD
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            Loading {chartType} data...
          </div>
        ) : currentData && currentData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={currentData}
                margin={{
                  top: 10,
                  left: 20,
                  right: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={formatDate}
                  interval={Math.ceil(currentData.length / 6)}
                />
                <YAxis
                  tickFormatter={(value) => formatPrice(value)}
                  axisLine={false}
                  tickLine={false}
                  domain={["auto", "auto"]}
                  width={90}
                />
                <Tooltip 
                  formatter={(value) => formatPrice(Number(value))} 
                  labelFormatter={(value) => new Date(value).toLocaleString()} 
                />
                <Line
                  dataKey={dataKey}
                  type="linear"
                  stroke={chartColor}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-64 flex items-center justify-center">
            No {chartType} data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}