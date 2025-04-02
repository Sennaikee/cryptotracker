"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import SearchableSelect from "./searchableselect";
import { ConversionType, ApiResponseItem } from "@/types/api";

// TODO: Fix this part to accept the props and show loading and error features

export default function ConvertCryptoToFiat() {
  const [amount, setAmount] = React.useState("0.00");
  const [fromType, setFromType] = React.useState<string>("");
  const [toType, setToType] = React.useState<string>("");
  const [result, setResult] = React.useState<number | null>(null);
  const [conversionType, setConversionType] =
    React.useState<ConversionType>("asset-to-currency");
  const [supportedCurrencies, setSupportedCurrencies] = React.useState<
    string[]
  >(["Hey"]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [supportedCrypto, setSupportedCrypto] = React.useState<
    Array<ApiResponseItem>
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [cryptoResponse, currenciesResponse] = await Promise.all([
          fetch("/api/supported-coins"),
          fetch("/api/supported-currencies"),
        ]);

        const cryptoData = await cryptoResponse.json();
        const currenciesData = await currenciesResponse.json();

        console.log("Fetched Crypto Data:", cryptoData);
        console.log("Fetched Currencies Data:", currenciesData);

        if (!Array.isArray(cryptoData) || cryptoData.length === 0) {
          throw new Error("Invalid or empty crypto data received");
        }
        if (!Array.isArray(currenciesData) || currenciesData.length === 0) {
          throw new Error("Invalid or empty currencies data received");
        }

        setSupportedCrypto(cryptoData);
        setSupportedCurrencies(currenciesData);
      } catch (err) {
        console.error("Data fetching error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load conversion data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleConvert = async () => {
    if (!fromType || !toType || !amount) {
      console.warn("Missing conversion parameters:", {
        fromType,
        toType,
        amount,
      });
      return;
    }

    console.log("Sending Conversion Request:", {
      type: conversionType,
      from: fromType,
      to: toType,
      amount: Number(amount),
    });

    try {
      const response = await fetch("/api/convertcryptotofiat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: conversionType,
          from: fromType,
          to: toType,
          amount: Number(amount),
        }),
      });

      const data = await response.json();
      console.log("Received Conversion Response:", data);

      if (!data.result) {
        console.error("Conversion failed, invalid response:", data);
        setError("Conversion failed. Please check input values.");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      console.error("Error during conversion:", err);
      setError("Conversion failed due to a network or API issue.");
    }
  };


  const handleSwap = () => {
    // Store current values before swapping
    const prevFromType = fromType;
    const prevToType = toType;

    // Update conversion type
    setConversionType((prev: ConversionType) =>
      prev === "asset-to-currency" ? "currency-to-asset" : "asset-to-currency"
    );

    // Swap the values
    setFromType(prevToType);
    setToType(prevFromType);
    setResult(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        Loading supported currencies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-red-500">{error}</div>
    );
  }

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">
          Convert{" "}
          {conversionType === "asset-to-currency"
            ? "Crypto to Fiat"
            : "Fiat to Crypto"}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSwap}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      {/* TODO: Fix the coversion result display */}
      {result !== null && (
        <div className="p-4 rounded-lg bg-[#1C1F26] border border-[#2A2D34]">
          <div className="text-sm text-gray-400 mb-1">Converted Amount</div>
          <div className="text-xl font-semibold text-white">
            {result.toFixed(6)} {toType}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {fromType} {Number.parseFloat(amount).toFixed(6)} = {toType}{" "}
            {result.toFixed(6)}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Input
          type="number"
          value={amount}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#1C1F26] border-[#2A2D34] text-white"
        />

        {/* From */}
        <div className="space-y-3">
          <div className="text-sm text-gray-400">From</div>
          {conversionType === "asset-to-currency" ? (
            <SearchableSelect
              value={fromType}
              onValueChange={setFromType}
              items={supportedCrypto.map((coin: ApiResponseItem) => ({
                value: coin.id, // use id as the value
                label: `${coin.symbol.toUpperCase()} - ${coin.name}`, // display format
              }))}
              placeholder="Select coin"
            />
          ) : (
            <Select defaultValue={fromType} onValueChange={setFromType}>
              <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* TO */}
        <div className="space-y-3">
          <div className="text-sm text-gray-400">To</div>
          {conversionType === "currency-to-asset" ? (
            <SearchableSelect
              value={toType}
              onValueChange={setToType}
              items={supportedCrypto.map((coin: ApiResponseItem) => ({
                value: coin.id, // use id as the value
                label: `${coin.symbol.toUpperCase()} - ${coin.name}`, // display format
              }))}
              placeholder="Select coin"
            />
          ) : (
            <Select defaultValue={toType} onValueChange={setToType}>
              <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {supportedCurrencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          className="bg-[#2A2D34] text-white hover:bg-[#3A3D44]"
          onClick={() => {
            setAmount("0.00");
            setFromType("");
            setToType("");
            setResult(null);
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#0066FF] hover:bg-[#0052CC]"
          onClick={handleConvert}
        >
          Convert
        </Button>
      </div>
    </div>
  );
}
