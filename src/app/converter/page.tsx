import React from 'react'
import ConvertCryptoToFiat from './components/convertcryptotofiat'
import ConvertCryptoToCrypto from './components/convertcryptotocrypto'

export default function Converter() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className=" rounded-lg shadow-lg">
            <ConvertCryptoToFiat />
          </div>
          <div className=" rounded-lg shadow-lg">
            <ConvertCryptoToCrypto />
          </div>
        </div>


      </div>
    </div>
  )
}