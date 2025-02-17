import CoinProps from "@/types/coindata";
import Image from "next/image";
import React from "react";

export default function Sidebar({ coin }: Readonly<{ coin: CoinProps }>) {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mt-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-xl">{coin.name}</span>
          <span className="text-gray-400">{coin.symbol}</span>
          <span className="text-gray-400 text-sm">Price</span>
          <span className="bg-gray-800 text-xs px-1.5 py-0.5 rounded">#1</span>
        </div>
      </div>
    </div>
  );
}
