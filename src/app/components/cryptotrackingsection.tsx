"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopCrypto from "./topcrypto";
import NFTCoins from "./nftcoins";
import DeFiCoins from "./deficoins";
import YieldFarming from "./yeildfarming";

export default function CryptoTrackingSection() {
  return (
    <div>
      <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-4xl p-8 font-bold mb-6">
          Crypto Tracking Section
        </h1>
        
        <div className="max-w-5xl mx-auto mt-6 px-4">
        <Tabs defaultValue="cryptocurrencies" className="max-w-5xl mx-auto mt-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
            <TabsTrigger value="cryptocurrencies">
              Top Cryptocurrencies
            </TabsTrigger>
            <TabsTrigger value="nft">Top NFT Coins</TabsTrigger>
            <TabsTrigger value="defi">Top DeFi Coins</TabsTrigger>
            <TabsTrigger value="yield">Top Yield Farming</TabsTrigger>
          </TabsList>

          <TabsContent value="cryptocurrencies">
            <TopCrypto />
          </TabsContent>
          
          <TabsContent value="nft">
            <NFTCoins />
          </TabsContent>
          
          <TabsContent value="defi">
            <DeFiCoins />
          </TabsContent>
          
          <TabsContent value="yield">
            <YieldFarming />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}