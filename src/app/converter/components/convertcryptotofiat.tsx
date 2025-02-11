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

const CURRENCIES = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
};

const ASSETS = {
  BTC: { symbol: "₿", rate: 34000 },
  ETH: { symbol: "Ξ", rate: 1800 },
  XAU: { symbol: "XAU", rate: 1950 }, // Gold
};

type ConversionType = "asset-to-currency" | "currency-to-asset";

interface ApiResponseItem {
  id: string;
  symbol: string;
  name: string;
}

export default function ConvertCryptoToFiat() {
  const [amount, setAmount] = React.useState("0.00");
  const [fromType, setFromType] = React.useState<string>("");
  const [toType, setToType] = React.useState<string>("");
  const [result, setResult] = React.useState<number | null>(null);
  const [conversionType, setConversionType] =
    React.useState<ConversionType>("asset-to-currency");
  const [supportedCurrencies, setSupportedCurrencies] = React.useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [supportedCrypto, setSupportedCrypto] = React.useState<
  Array<ApiResponseItem>
>([]); 

  React.useEffect(() => {
    const fetchSupportedCrypto = async () => {
      try {
        const response = await fetch("/api/supported-coins");
        const data = await response.json();
        if (Array.isArray(data)) {
          setSupportedCrypto(data);
        } else {
          setError("Invalid data format");
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load supported crypto");
        setIsLoading(false);
      }
    };

    fetchSupportedCrypto();
  }, []);

  React.useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      try {
        const response = await fetch("/api/supported-currencies");
        const data = await response.json();

        if (Array.isArray(data)) {
          setSupportedCurrencies(data);
        } else {
          setError("Invalid data format");
        }
        setIsLoading(false);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load supported currencies");
        setIsLoading(false);
      }
    };
    fetchSupportedCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!fromType || !toType || !amount) {
      return;
    }

    let fromRate, toRate;

    if (conversionType === "asset-to-currency") {
      try {
        const response = await fetch("/api/convertcryptotofiat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "asset-to-currency",
            from: fromType,
            to: toType,
            amount: Number(amount),
          }),
        });
        const data = await response.json();
        setResult(data.result);
      } catch (err) {
        console.error(err);
        setError("Conversion failed");
      }
    } else {
      try {
        const response = await fetch("/api/convertcryptotofiat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "currency-to-asset",
            from: fromType,
            to: toType,
            amount: Number(amount),
          }),
        });
        const data = await response.json();
        setResult(data.result);
      } catch (err) {
        console.error(err);
        setError("Conversion failed");
      }
    }

    if (fromRate && toRate) {
      const conversion = (Number.parseFloat(amount) * toRate) / fromRate;
      setResult(conversion);
    }
  };

  const handleSwap = () => {
    setConversionType((prev: ConversionType) =>
      prev === "asset-to-currency" ? "currency-to-asset" : "asset-to-currency"
    );
    setFromType("");
    setToType("");
    setResult(null);
  };

  const getSymbol = (type: string) => {
    return (
      ASSETS[type as keyof typeof ASSETS]?.symbol ||
      CURRENCIES[type as keyof typeof CURRENCIES]?.symbol ||
      type
    );
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
            {getSymbol(toType)}
            {result.toFixed(6)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {getSymbol(fromType)}
            {Number.parseFloat(amount).toFixed(6)} {fromType} ={" "}
            {getSymbol(toType)}
            {result.toFixed(6)} {toType}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#1C1F26] border-[#2A2D34] text-white"
        />

        <div className="space-y-3">
          <div className="text-sm text-gray-400">From</div>
          <SearchableSelect
            value={fromType}
            onValueChange={setFromType}
            items={supportedCrypto}
            placeholder="Select coin"
          />
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">From</div>
          <Select value={fromType} onValueChange={setFromType}>
            <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
              {conversionType === "asset-to-currency" ? (
                <SelectValue placeholder="Select coin" />
              ) : (
                <SelectValue placeholder="Select currency" />
              )}
            </SelectTrigger>
            <SelectContent>
              {(conversionType === "asset-to-currency"
                ? Object.keys(ASSETS)
                : supportedCurrencies
              ).map((key) => (
                <SelectItem key={key} value={key}>
                  {key.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">To</div>
          <Select value={toType} onValueChange={setToType}>
            <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
              {conversionType === "asset-to-currency" ? (
                <SelectValue placeholder="Select currency" />
              ) : (
                <SelectValue placeholder="Select coin" />
              )}
            </SelectTrigger>
            <SelectContent>
              {(conversionType === "currency-to-asset"
                ? Object.keys(ASSETS)
                : supportedCurrencies
              ).map((key) => (
                <SelectItem key={key} value={key}>
                  {key.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
