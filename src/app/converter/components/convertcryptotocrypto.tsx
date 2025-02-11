"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const ASSETS = {
  BTC: { symbol: "₿", rate: 34000 },
  ETH: { symbol: "Ξ", rate: 1800 },
  XAU: { symbol: "XAU", rate: 1950 }, // Gold
}

export default function ConvertCryptoToCrypto() {

    const [amount, setAmount] = React.useState("0.00")
    const [fromCrypto, setFromCrypto] = React.useState<string>("")

    const [toCrypto, setToCrypto] = React.useState<string>("")
    const [result, setResult] = React.useState<number | null>(null)
    
    const handleConvert = () => {
        if (!fromCrypto || !toCrypto || !amount) {
            return
        }   
        const fromRate = ASSETS[fromCrypto as keyof typeof ASSETS]?.rate
        const toRate = ASSETS[toCrypto as keyof typeof ASSETS]?.rate

        if (fromRate && toRate) {
            const conversion = (Number.parseFloat(amount) * toRate) / fromRate
            setResult(conversion)
        }
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
            {result.toFixed(6)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {Number.parseFloat(amount).toFixed(6)} {fromCrypto} = {toCrypto}
            {result.toFixed(6)} {toCrypto}
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

        <div className="space-y-1">
          <div className="text-sm text-gray-400">From</div>
          <Select value={fromCrypto} onValueChange={setFromCrypto}>
            <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              {Object.keys(ASSETS).map((key) => (
                <SelectItem key={key} value={key}>

                    {key}
                    </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-gray-400">To</div>
          <Select value={toCrypto} onValueChange={setToCrypto}>
            <SelectTrigger className="w-full bg-[#1C1F26] border-[#2A2D34] text-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              {Object.keys(ASSETS).map((key) => (
                <SelectItem key={key} value={key}>
                  {key}
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
            setAmount("0.00")
            setFromCrypto("")
            setToCrypto("")
            setResult(null)

          }}
        >
          Cancel
        </Button>
        <Button className="bg-[#0066FF] hover:bg-[#0052CC]" onClick={handleConvert}>
          Convert
        </Button>
      </div>
    </div>
  )

}






