import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SideBarLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <div className="text-sm text-gray-400">
          <Skeleton className="h-4 w-32 " />
        </div>
      </div>
    </div>
  );
}
