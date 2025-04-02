import React from "react";
import ConvertCryptoToFiat from "./components/convertcryptotofiat";
import ConvertCryptoToCrypto from "./components/convertcryptotocrypto";
// import { NextResponse } from 'next/server';

export default async function Converter() {


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
