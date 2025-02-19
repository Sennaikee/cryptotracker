import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SideBarLoading() {
  return (
    <div className="min-w-96 border-r border-gray-800 p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mt-4">
          <Skeleton className="h-8 w-8 bg-gray-800" />
          <Skeleton className="h-5 w-16 bg-gray-800" />
          <Skeleton className="h-5 w-16 bg-gray-800" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-10 w-48 bg-gray-800" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-4 w-16 bg-gray-800" />
          </div>
        </div>
        <div className="flex justify-between text-sm mt-4">
          <Skeleton className="h-4 w-24 bg-gray-800" />
          <Skeleton className="h-4 w-24 bg-gray-800" />
          <Skeleton className="h-4 w-24 bg-gray-800" />
        </div>
      </div>
      {/* Market Stats */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-32 bg-gray-800" />
            <Skeleton className="h-4 w-40 bg-gray-800" />
          </div>
        ))}
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-16 bg-gray-800" />
        <div className="flex gap-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
