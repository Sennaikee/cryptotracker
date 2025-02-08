import React from 'react'
import Image from 'next/image'


export default function HeroSection() {
  return (
    <div>
        <div className="relative h-[300px] overflow-hidden">
        <Image
          src={'/bitcoin.jpg'}
          alt="Bitcoin illustration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-4xl font-bold text-white mb-2">Track the top cryptocurrencies</h2>
          <p className="text-gray-200">Find new coins and track your favorites with prices, market cap, and more.</p>
        </div>
      </div>
    </div>
  )
}