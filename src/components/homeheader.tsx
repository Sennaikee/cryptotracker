"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomeHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">
        <Link href="/">CryptoTrack</Link>
      </h1>

      <div className="ml-auto flex gap-2">
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" asChild>
            <Link href="/faqs">FAQs</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" asChild>
            <Link href="/converter">Converter</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
