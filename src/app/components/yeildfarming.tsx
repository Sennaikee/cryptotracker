"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";


export default function YieldFarming() {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


  
    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch("/api/fetchtopyeildfarming");
          const data = await response.json();
          setCoins(data);
          setIsLoading(false);
        } catch (error) {
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
      return coins?.map((coin: {
        id: string;
        price_change_percentage_24h: number;
        name: string;
        market_cap: number;
        total_volume: number;
        current_price: number;
      }) => (
        <div
          key={coin.id}
          className="flex items-center justify-between py-4 border-b border-border hover:bg-muted/50 transition-colors rounded-lg px-4"
        >
          <div className="flex items-center gap-4">
            {coin.price_change_percentage_24h >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <div>
              <h3 className="font-medium">{coin.name}</h3>
              <p className="text-sm text-muted-foreground">
                Market Cap: ${coin.market_cap.toLocaleString()} • 24h Trading
                Volume: ${coin.total_volume.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium">
              ${coin.current_price.toLocaleString()}
            </span>
            {coin.price_change_percentage_24h >= 0 ? (
              <h4 className="text-green-500">
                {coin.price_change_percentage_24h < 0.001
                  ? coin.price_change_percentage_24h.toPrecision(2)
                  : coin.price_change_percentage_24h.toFixed(2)}
                %
              </h4>
  
            ) : (
              <h4 className="text-red-500">
                {coin.price_change_percentage_24h < 0.001
                  ? coin.price_change_percentage_24h.toPrecision(2)
                  : coin.price_change_percentage_24h.toFixed(2)}
                %
              </h4>
            )}
          </div>
        </div>
      ));
    };
  
    return (
      <div className="max-w-5xl mx-auto mt-6 p-4">{renderContent()}</div>
    );
  }
  