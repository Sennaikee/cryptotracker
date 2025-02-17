import React, { Suspense } from "react";
import Sidebar from "./components/sidebar";
import SideBarLoading from "./components/sidebarloading";

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch coin data
  const fetchData = async () => {
    const response = await fetch(`/api/fetchcoindata`, {
      method: "POST",
      body: JSON.stringify({ id: params.slug }),
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
    </div>
  );
}
