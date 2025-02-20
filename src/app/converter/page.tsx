import React from "react";
import ConvertCryptoToFiat from "./components/convertcryptotofiat";
import ConvertCryptoToCrypto from "./components/convertcryptotocrypto";
// import { NextResponse } from 'next/server';

export default async function Converter() {
  // const apiKey = process.env.API_KEY!;
  // const supportedCoinsEndpoint = `https://api.coingecko.com/api/v3/coins/list?include_platform=false&x_cg_demo_api_key=${apiKey}`;
  // const supportedCurrenciesEndpoint = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;
  // let supportedCoins, supportedCurrencies;

  // TODO: Fix the below function to fetch the data and pass it to the components.
  // const fetchData = async () => {
  //   try {
  //     const [coinResponse, currenciesResponse] = await Promise.all([
  //       fetch(supportedCoinsEndpoint, {headers: {
  //         accept: "application/json",
  //     }}),
  //       fetch(supportedCurrenciesEndpoint, {
  //         headers: {
  //         accept: "application/json",
  //         "x-cg-demo-api-key": apiKey,
  //       }}),
  //     ])

  //     const supportedCoinsdata = await coinResponse.json();
  //     const supportedCurrenciesdata = await currenciesResponse.json();

  //     supportedCoins = NextResponse.json(supportedCoinsdata);
  //     supportedCurrencies = NextResponse.json(supportedCurrenciesdata);
  //   }
  //   catch (err) {
  //     console.error("Data fetching error:", err);
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className=" rounded-lg shadow-lg">
            {/* TODO: Fix multiple function calls and pass the fetched Data from here. */}
            <ConvertCryptoToFiat />
          </div>
          <div className=" rounded-lg shadow-lg">
            <ConvertCryptoToCrypto />
          </div>
        </div>
      </div>
    </div>
  );
}
