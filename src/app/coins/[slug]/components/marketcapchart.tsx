"use client";

import React from "react";
import { CoinDataProps } from "@/types/coindata";

interface MarketCapChartProps {
    coin: CoinDataProps;
    timeRange: string;
}

export default function MarketCapChart({ coin, timeRange }: Readonly<MarketCapChartProps>) {
  return (
    <div>
      <h1>Market Cap Chart</h1>
    </div>
  );
}