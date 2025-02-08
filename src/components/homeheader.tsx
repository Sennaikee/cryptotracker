"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">CryptoTrack</h1>

      <div className="flex items-center gap-2">
        {pathname !== "/converter" && (
          <Button variant="default" size="sm" asChild>
            <Link href="/converter">Converter</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default HomeHeader;
