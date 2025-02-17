import CoinProps from "@/types/coindata";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Coin({ coin }: Readonly<{ coin: CoinProps }>) {
  return (
    <>
      <Link href={`/coins/${coin.id}`} className="flex items-center gap-4">
        <Image
          src={coin.image}
          alt={coin.name}
          width={30}
          height={30}
          className="rounded-full"
        />
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
      </Link>
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
    </>
  );
}
