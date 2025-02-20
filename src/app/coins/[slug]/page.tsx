import React, { Suspense } from "react";
import Sidebar from "./components/sidebar";
import SideBarLoading from "./components/sidebarloading";
import { CoinDataProps } from "@/types/coindata";
import MainSection from "./components/mainsection";

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const apiKey = process.env.API_KEY;

  // First, await the params object
  const resolvedParams = params;
  const slug = resolvedParams.slug;

  const fetchData = async (coinSlug: string): Promise<CoinDataProps> => {
    const endPoint = `https://api.coingecko.com/api/v3/coins/${coinSlug}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true&x_cg_demo_api_key=${apiKey}`;

    const response = await fetch(endPoint, {
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();
  };

  // Use the resolved slug
  const coinData = await fetchData(slug);

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
