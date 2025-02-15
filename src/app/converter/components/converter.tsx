"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ApiResponseItem } from "@/types/api"

export default function CurrencyConverter() {
  const [amount, setAmount] = React.useState("0.00")
  const [fromCurrency, setFromCurrency] = React.useState("")
  const [toCurrency, setToCurrency] = React.useState("")
  const [result, setResult] = React.useState<number | null>(null)
  const [supportedCurrencies, setSupportedCurrencies] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [mappedCurrencies, setMappedCurrencies] = React.useState<ApiResponseItem[]>([])

  // Fetch mapped currencies on component mount
  React.useEffect(() => {
    const fetchMappedCurrencies = async () => {
      try {
        const response = await fetch('/api/convertable-currencies')
        const data = await response.json()
        setMappedCurrencies(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load mapped currencies')
      }
    }

    fetchMappedCurrencies()
  }, [])


  // Fetch supported currencies on component mount
  React.useEffect(() => {
    async function fetchSupportedCurrencies() {
      try {
        const response = await fetch('/api/supported-currencies')
        const data = await response.json()

        // Ensure data is an array of strings
        if (Array.isArray(data)) {
          setSupportedCurrencies(data)
        } else {
          setError('Invalid data format')
        }
        setIsLoading(false)

      } catch (err) {
        console.error(err)
        setError('Failed to load supported currencies')
        setIsLoading(false)
      }

    }

    fetchSupportedCurrencies()
  }, [])

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      return
    }

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: mappedCurrencies.find(currency => currency.symbol === fromCurrency)?.id,
          to: mappedCurrencies.find(currency => currency.symbol === toCurrency)?.id,
          amount: Number(amount)

        })
      })
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      console.error(err)
      setError('Conversion failed')
    }
  }


  if (isLoading) {
    return <div className="w-full max-w-md mx-auto p-6">Loading supported currencies...</div>
  }

  if (error) {
    return <div className="w-full max-w-md mx-auto p-6 text-red-500">{error}</div>
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-xl font-semibold">Convert</div>

      {result !== null && (
        <div className="p-4 rounded-lg bg-[#1C1F26] border border-[#2A2D34]">
          <div className="text-sm text-gray-400 mb-1">Converted Amount</div>
          <div className="text-2xl font-semibold text-white">
            APP{/* {CURRENCY_SYMBOLS[toCurrency] || ''}{result.toFixed(8)} */}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {/* {CURRENCY_SYMBOLS[fromCurrency] || ''}{Number.parseFloat(amount).toFixed(8)} {fromCurrency.toUpperCase()} = {' '} */}
            {/* {CURRENCY_SYMBOLS[toCurrency] || ''}{result.toFixed(8)} {toCurrency.toUpperCase()} */}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#1C1F26] border-[#2A2D34] text-white"
        />

        <div className="space-y-2">
          <div className="text-sm text-gray-400">From</div>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
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
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">To</div>
          <Select value={toCurrency} onValueChange={setToCurrency}>
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
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          className="bg-[#2A2D34] text-white hover:bg-[#3A3D44]"
          onClick={() => {
            setAmount("0.00")
            setFromCurrency("")
            setToCurrency("")
            setResult(null)
          }}
        >
          Cancel
        </Button>
        <Button 
          className="bg-[#0066FF] hover:bg-[#0052CC]" 
          onClick={handleConvert}
          disabled={!fromCurrency || !toCurrency || !amount}
        >
          Convert
        </Button>
      </div>
    </div>
  )
}