import { TimeRange } from "@/types/time";

function getUnixTimeRange(timeRange: TimeRange) {
    const now = Math.floor(Date.now() / 1000); // Current Unix time in seconds
    let startTime;

    const timeMap = {
        "5m": 5 * 60,         // 5 minutes
        "1h": 60 * 60,        // 1 hour
        "6h": 6 * 60 * 60,    // 6 hours
        "24h": 24 * 60 * 60,  // 24 hours
        "7d": 7 * 24 * 60 * 60, // 7 days
        "1mth": 30 * 24 * 60 * 60, // 1 month (approx)
        "3mth": 90 * 24 * 60 * 60  // 3 months (approx)
    };

    if (timeMap[timeRange]) {
        startTime = now - timeMap[timeRange];
    } else {
        throw new Error("Invalid time range");
    }

    return { startTime: startTime, endTime: now };
}

// Example usage:
// console.log(getUnixTimeRange("1h")); // { startTime: 1707052800, endTime: 1707056400 }
// console.log(getUnixTimeRange("7d")); // { startTime: 1706448000, endTime: 1707052800 }
