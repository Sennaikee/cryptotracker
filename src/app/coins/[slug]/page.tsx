import React, { Suspense } from "react";
import Sidebar from "./components/sidebar";
import SideBarLoading from "./components/sidebarloading";
import { CoinDataProps } from "@/types/coindata";
import MainSection from "./components/mainsection";

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const apiKey = process.env.API_KEY;
  const endPoint = `https://api.coingecko.com/api/v3/coins/${params.slug}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true&x_cg_demo_api_key=${apiKey}`;

  const fetchData = async (): Promise<CoinDataProps> => {
    const response = await fetch(endPoint, {
      next: {
        revalidate: 300,
      },
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  const coinData = await fetchData();

  return (
    <div className="flex">
      <Suspense fallback={<SideBarLoading />}>
        <Sidebar coin={coinData} />
      </Suspense>
      <Suspense>
        <MainSection coin={coinData} />
      </Suspense>
    </div>
  );
}
