"use client";

import { useState } from "react";
import {
  Bitcoin,
  Star,
  Info,
  ArrowUp,
  Twitter,
  Facebook,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function CryptoTracker() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-[400px] border-r border-gray-800 p-6 space-y-6">
          <div className="space-y-1">
            <div className="text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer">
                Cryptocurrencies
              </span>
              <span className="mx-2">›</span>
              <span className="hover:text-white cursor-pointer">
                Bitcoin Price
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Bitcoin className="w-8 h-8 text-[#f7931a]" />
              <span className="text-xl">Bitcoin</span>
              <span className="text-gray-400">BTC</span>
              <span className="text-gray-400 text-sm">Price</span>
              <span className="bg-gray-800 text-xs px-1.5 py-0.5 rounded">
                #1
              </span>
            </div>

            <div className="mt-4">
              <div className="text-4xl font-bold">$97,606.58</div>
              <div className="flex items-center gap-2 text-[#00ff88]">
                <ArrowUp className="w-4 h-4" />
                <span>0.7%</span>
              </div>
            </div>

            <div className="text-sm text-gray-400 mt-2">
              1.0000 BTC <span className="text-[#00ff88]">↑ 0.0%</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>$96,353.28</span>
              <span>24h Range</span>
              <span>$98,623.62</span>
            </div>

            <Button variant="outline" className="w-full mt-4 text-gray-400">
              <Star className="w-4 h-4 mr-2" />
              Add to Portfolio • 1,925,519 added
            </Button>
          </div>

          {/* Market Stats */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400">
                Market Cap
                <Info className="w-4 h-4" />
              </div>
              <div>$1,935,004,864,711</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400">
                24 Hour Trading Vol
                <Info className="w-4 h-4" />
              </div>
              <div>$27,419,538,065</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400">
                Circulating Supply
                <Info className="w-4 h-4" />
              </div>
              <div>19,824,534</div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg">Info</h3>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                bitcoin.org
              </Button>
              <Button variant="secondary" size="sm">
                Whitepaper
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <span>Explorers</span>
              <Button variant="ghost" size="sm">
                Mempool
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <span>Wallets</span>
              <Button variant="ghost" size="sm">
                Ledger
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div>
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
            </div>
          </div>
        </div>

        {/* Main Content */}
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
                  <TabsTrigger value="markets">Markets</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                  <TabsTrigger value="similar">Similar Coins</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-4">
                <Button variant="ghost">
                  Historical Data
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="ghost">
                  Bitcoin Halving Countdown
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Chart Controls */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Price
                </Button>
                <Button variant="ghost" size="sm">
                  Market Cap
                </Button>
                <Button variant="ghost" size="sm">
                  TradingView
                </Button>
              </div>

              <div className="flex gap-2">
                {["24h", "7d", "1m", "3m", "1y", "Max"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="h-[400px] bg-[#0f172a] relative">
              {/* Simplified chart representation */}
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,200 C100,180 200,220 300,160 C400,100 500,300 600,120 C700,180 800,160 900,200"
                  stroke="#00ff88"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,200 C100,180 200,220 300,160 C400,100 500,300 600,120 C700,180 800,160 900,200 L900,400 L0,400 Z"
                  fill="url(#gradient)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Price indicators */}
              <div className="absolute right-4 top-4 space-y-2 text-sm">
                <div>$99K</div>
                <div>$98K</div>
                <div>$97K</div>
                <div>$96.5K</div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-6 gap-4">
              {[
                { period: "1h", value: "-0.0%", negative: true },
                { period: "24h", value: "0.7%", negative: false },
                { period: "7d", value: "1.6%", negative: false },
                { period: "14d", value: "-3.9%", negative: true },
                { period: "30d", value: "-1.6%", negative: true },
                { period: "1y", value: "86.4%", negative: false },
              ].map((stat) => (
                <div key={stat.period} className="bg-[#1a2234] p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">{stat.period}</div>
                  <div
                    className={
                      stat.negative ? "text-red-500" : "text-[#00ff88]"
                    }
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
