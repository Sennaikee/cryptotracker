type TimeRange = "5m" | "1h" | "6h" | "24h" | "7d" | "1mth" | "3mth";

interface UnixTimeRange {
    startTime: number;
    endTime: number;
}

export type { TimeRange, UnixTimeRange };