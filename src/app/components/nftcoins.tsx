"use client";
import React, { useEffect, useState } from "react";
import Coin from "./coin";
export default function NFTCoins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/fetchtopnftcoins");
        const data = await response.json();
        setCoins(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load data");
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-8">Loading...</div>;
    }
    if (error) {
      return (
        <div className="text-center py-8 text-red-500">
          Error loading data. Please try again later.
        </div>
      );
    }
    if (coins?.length === 0) {
      return <div className="text-center py-8">No coins found.</div>;
    }
    return coins?.map(
      (coin: {
        id: string;
        name: string;
        symbol: string;
        image: string;
        price_change_percentage_24h: number;
        market_cap: number;
        total_volume: number;
        current_price: number;
      }) => (
        <div
          key={coin.id}
          className="flex items-center justify-between py-4 border-b border-border hover:bg-muted/50 transition-colors rounded-lg px-4"
        >
          <Coin coin={coin} />
        </div>
      )
    );
  };

  return <div className="max-w-5xl mx-auto mt-6 p-4">{renderContent()}</div>;
}
