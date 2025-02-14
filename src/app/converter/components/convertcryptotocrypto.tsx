"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchableSelect from "./searchableselect";
import { ApiResponseItem } from "@/types/api";

export default function ConvertCryptoToCrypto() {
  const [amount, setAmount] = React.useState("0.00");
  const [fromCrypto, setFromCrypto] = React.useState<string>("");
  const [toCrypto, setToCrypto] = React.useState<string>("");
  const [supportedCrypto, setSupportedCrypto] = React.useState<
    Array<ApiResponseItem>
  >([]);
  const [result, setResult] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/supported-coins");
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid crypto data format received");
        }
        setSupportedCrypto(data);
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
    if (!fromCrypto || !toCrypto || !amount) {
      return;
    }

    try {
      const response = await fetch("/api/convertcryptotocrypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromCrypto,
          to: toCrypto,
          amount: Number(amount),
        }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Conversion failed");
    }
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
        <div className="text-xl font-semibold">Convert</div>
      </div>

      {result !== null && (
        <div className="p-4 rounded-lg bg-[#1C1F26] border border-[#2A2D34]">
          <div className="text-sm text-gray-400 mb-1">Converted Amount</div>
          <div className="text-xl font-semibold text-white">
            {result.toFixed(6)} {toCrypto}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {Number.parseFloat(amount).toFixed(6)} {fromCrypto} =
            {result.toFixed(6)} {toCrypto}
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

        <div className="space-y-1">
          <div className="text-sm text-gray-400">From</div>
          <SearchableSelect
            value={fromCrypto}
            onValueChange={setFromCrypto}
            items={supportedCrypto}
            placeholder="Select coin"
          />
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">To</div>
          <SearchableSelect
            value={toCrypto}
            onValueChange={setToCrypto}
            items={supportedCrypto}
            placeholder="Select coin"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          className="bg-[#2A2D34] text-white hover:bg-[#3A3D44]"
          onClick={() => {
            setAmount("0.00");
            setFromCrypto("");
            setToCrypto("");
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
