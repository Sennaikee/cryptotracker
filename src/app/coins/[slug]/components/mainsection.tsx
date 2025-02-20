"use client";

import { CoinDataProps } from "@/types/coindata";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Chart from "./chart";
import { getUnixTimeRange } from "@/app/lib/calculateunixtime";
import { TimeRange } from "@/types/time";

const timeRanges: TimeRange[] = ["5m", "1h", "6h", "24h", "7d", "1mth", "3mth"];

export default function MainSection({
  coin,
}: Readonly<{ coin: CoinDataProps }>) {
  // Add state to track which chart type is selected
  const [chartType, setChartType] = useState("price");
  // Add state to track which time range is selected
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <Tabs defaultValue="overview" className="w-auto">
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              {/* <TabsTrigger
                value="markets"
                className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
              >
                Markets
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
              >
                News
              </TabsTrigger>
              <TabsTrigger
                value="similar"
                className="data-[state=active]:bg-[#00ff88] data-[state=active]:text-black"
              >
                Similar Coins
              </TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>

        {/* Chart Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              className={
                chartType === "price"
                  ? "bg-slate-400 text-black"
                  : "bg-slate-200 text-gray-600 hover:bg-slate-300"
              }
              variant={chartType === "price" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("price")}
            >
              Price
            </Button>
            <Button
              className={
                chartType === "marketcap"
                  ? "bg-slate-400 text-black"
                  : "bg-slate-200 text-gray-600 hover:bg-slate-300"
              }
              variant={chartType === "marketcap" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("marketcap")}
            >
              Market Cap
            </Button>
            <Button
              className={
                chartType === "volume"
                  ? "bg-slate-400 text-black"
                  : "bg-slate-200 text-gray-600 hover:bg-slate-300"
              }
              variant={chartType === "volume" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("volume")}
            >
              Volume
            </Button>
            {/* <Button
              className={
                chartType === "tradingview"
                  ? "bg-slate-400 text-black"
                  : "bg-slate-200 text-gray-600 hover:bg-slate-300"
              }
              variant={chartType === "tradingview" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("tradingview")}
            >
              TradingView
            </Button> */}
          </div>
          <div className="flex gap-2">
          {timeRanges.map((range) => (
  <Button
    key={range}
    className={
      timeRange === range
        ? "bg-slate-400 text-black"
        : "bg-slate-200 text-gray-600 hover:bg-slate-300"
    }
    variant={timeRange === range ? "secondary" : "ghost"}
    size="sm"
    onClick={() => setTimeRange(range)}
  >
    {range}
  </Button>
))}
          </div>
        </div>

        {/* Conditional Chart Rendering */}
        {chartType === "price" && <Chart coinid={coin.id} chartType={chartType} timeRange={getUnixTimeRange(timeRange)} />}
        {chartType === "marketcap" && <Chart coinid={coin.id} chartType={chartType } timeRange={getUnixTimeRange(timeRange)} />}
        {chartType === "volume" && <Chart coinid={coin.id} chartType={chartType} timeRange={getUnixTimeRange(timeRange)} />}
        {chartType === "tradingview" && (
          <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">TradingView chart would load here</p>
          </div>
        )}
      </div>
    </div>
  );
}