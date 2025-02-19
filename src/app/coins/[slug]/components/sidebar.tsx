import { CoinDataProps } from "@/types/coindata";
import Image from "next/image";
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar({ coin }: Readonly<{ coin: CoinDataProps }>) {
  return (
    <div className="min-w-96 border-r border-gray-300 p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mt-4">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-xl">{coin.name}</span>
          <span className="text-gray-400">{coin.symbol.toUpperCase()}</span>
          <span className="text-gray-400 text-sm">Price</span>
          {/* <span className="bg-gray-800 text-xs px-1.5 py-0.5 rounded">#1</span> */}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-4xl font-bold">
          ${coin.market_data.current_price.usd.toLocaleString("en-US")}
        </div>
        {coin.market_data.price_change_percentage_24h > 0 ? (
          <div className="flex items-center gap-2 text-[#00ff88]">
            <ArrowUp className="w-4 h-4" />
            <span>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#ff4d4d]">
            <ArrowDown className="w-4 h-4" />
            <span>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>${coin.market_data.high_24h.usd.toLocaleString("en-US")}</span>
          <span>24h range</span>
          <span>${coin.market_data.low_24h.usd.toLocaleString("en-US")}</span>
        </div>
      </div>

      {/* Market Stats */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            Market Cap
          </div>
          <div>${coin.market_data.market_cap.usd.toLocaleString("en-US")}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            24 Hour Trading Vol
          </div>
          <div>
            ${coin.market_data.circulating_supply.toLocaleString("en-US")}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            Circulating Supply
          </div>
          <div>
            {coin.market_data.circulating_supply.toLocaleString("en-US")}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        <h3 className="text-lg">Info</h3>
        <div className="flex gap-2">
          <Link href={coin.links.homepage[0]} target="_blank">
            <Button variant="secondary" size="sm">
              {coin.links.homepage[0].replace(/^https?:\/\//, "")}
            </Button>
          </Link>

          <Link href={coin.links.whitepaper} target="_blank">
            <Button variant="secondary" size="sm">
              Whitepaper
            </Button>
          </Link>
        </div>

        {/* <div>
          <h3 className="text-lg mb-2">Community</h3>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="secondary" size="sm">
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button variant="secondary" size="sm">
              bitcointalk.org
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
